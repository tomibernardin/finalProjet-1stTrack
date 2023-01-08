package com.integrator.group2backend.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.integrator.group2backend.controller.CategoryController;
import com.integrator.group2backend.exception.DataIntegrityViolationException;
import com.integrator.group2backend.exception.ImageSizeTooLongException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

@Service
public class AmazonClient {
    public static final Logger logger = Logger.getLogger(AmazonClient.class);

    private AmazonS3 s3client;

    @Value("${amazon.s3.bucket-url}")
    private String endpointUrl;
    @Value("${amazon.s3.default-bucket}")
    private String bucketName;
    @Value("${amazon.aws.access-key-id}")
    private String accessKey;
    @Value("${amazon.aws.access-key-secret}")
    private String secretKey;

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3client = new AmazonS3Client(credentials);
    }
    public File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
    private String generateFileName(MultipartFile multiPart) {
        String name = new Date().getTime() + "-" + multiPart.getOriginalFilename().replaceAll("[\\-\\+\\ñ\\Ñ\\^:,]","");
        return name.replace(" ", "_");
    }
    private void uploadFileTos3bucket(String fileName, File file) {
        s3client.putObject(new PutObjectRequest(bucketName, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }
    private void changeFileNameIns3bucket(String oldFileName, String newFileName) {
        CopyObjectRequest copyObjRequest = new CopyObjectRequest(bucketName,
                oldFileName, bucketName, newFileName);
        s3client.copyObject(copyObjRequest);
        s3client.deleteObject(new DeleteObjectRequest(bucketName, oldFileName));
    }
    private S3Object getFileFroms3bucket(String fileName) {
        return s3client.getObject(new GetObjectRequest(bucketName, fileName));
    }
    public String uploadFile(MultipartFile multipartFile) {
        if (multipartFile.getSize() <= 3145728 ){
            String fileUrl = "";
            try {
                File file = convertMultiPartToFile(multipartFile);
                String fileName = generateFileName(multipartFile);
                fileUrl = endpointUrl + "/" + fileName;
                uploadFileTos3bucket(fileName, file);
                file.delete();
                logger.info("Se cargo una imagen en el bucket S3 con endpoint " + endpointUrl);
                return fileUrl;
            } catch (Exception e) {
                logger.error("Hubo un error en la creacion del archivo");
                e.printStackTrace();
                return null;
            }
        }
        logger.error("El archivo de imagen es demasiado pesado.");
        return null;
    }
    public String updateFile(String fileToReplaceName, MultipartFile newMultipartFile) throws DataIntegrityViolationException, ImageSizeTooLongException{
        if (newMultipartFile.getSize() <= 3145728 ){
            try {
                S3Object objectToUpdate = getFileFroms3bucket(fileToReplaceName);
                if(objectToUpdate != null){
                    File newFile = convertMultiPartToFile(newMultipartFile);
                    String newFileName = generateFileName(newMultipartFile);

                    uploadFileTos3bucket(objectToUpdate.getKey(), newFile);
                    changeFileNameIns3bucket(objectToUpdate.getKey(), newFileName);

                    newFile.delete();
                    String newFileUrl = endpointUrl + "/" + newFileName;
                    logger.info("Se actualizo una imagen en el bucket S3 con endpoint " + endpointUrl);
                    return newFileUrl;
                }
            } catch (Exception e) {
                logger.error("Hubo un error buscando el archivo viejo en el S3");
                e.printStackTrace();
                throw new DataIntegrityViolationException("File name of old product doesn't exist");
            }
        }
        logger.error("El archivo de imagen es demasiado pesado.");
        throw new ImageSizeTooLongException("The image size cannot be larger than 3 MB");
    }
    public String deleteFileFromS3Bucket(String fileName) {
        System.out.println(s3client.doesBucketExist(fileName));
        System.out.println(bucketName+"/"+fileName);
        s3client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
        logger.info("Se elimino una imagen del bucket S3 con endpoint " + endpointUrl);
        return "Successfully deleted";
    }
}
