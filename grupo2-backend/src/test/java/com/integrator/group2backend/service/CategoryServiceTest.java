package com.integrator.group2backend.service;


import com.integrator.group2backend.entities.Category;
import com.integrator.group2backend.entities.Image;
import com.integrator.group2backend.repository.CategoryRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;

@RunWith(MockitoJUnitRunner.class)
public class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    private CategoryService categoryService;

    @Before
    public void setUp() {
        this.categoryService = new CategoryService(this.categoryRepository);
    }


    @Test
    public void testAddCategory() {
        Image categoryImage = new Image();
        categoryImage.setId(10L);

        Image illustrationImage = new Image();
        illustrationImage.setId(11L);

        Category requestCategory = new Category();
        requestCategory.setCategoryImage(categoryImage);
        requestCategory.setCategoryIllustration(illustrationImage);
        requestCategory.setDescription("Casas en general");
        requestCategory.setTitle("Casas");

        ArgumentCaptor<Category> categoryArgumentCaptor = ArgumentCaptor.forClass(Category.class);
        Mockito.when(this.categoryRepository.save(categoryArgumentCaptor.capture())).thenReturn(null);

        this.categoryService.addCategory(requestCategory);

        Category capturedCategory = categoryArgumentCaptor.getValue();

        Assert.assertNotNull(capturedCategory.getCategoryImage());
        Assert.assertNotNull(capturedCategory.getCategoryIllustration());
        Assert.assertEquals("Casas en general", capturedCategory.getDescription());
        Assert.assertEquals("Casas", capturedCategory.getTitle());
    }

    @Test
    public void testSearchCategoryById() {
        Mockito.when(this.categoryRepository.findById(eq(1L))).thenReturn(null);

        this.categoryService.searchCategoryById(1L);

        Mockito.verify(this.categoryRepository, times(1)).findById(eq(1L));

    }

    @Test
    public void testSearchAllCategories() {
        Mockito.when(this.categoryRepository.findAll()).thenReturn(null);

        this.categoryService.listAllCategories();

        Mockito.verify(this.categoryRepository, times(1)).findAll();
    }

    @Test
    public void testUpdateCategoryWithImagesInDBButNoImagesInRequest() {
        Image categoryImage = new Image(); //creo dos imagenes y seteo id
        categoryImage.setId(10L);

        Image illustrationImage = new Image();
        illustrationImage.setId(11L);

        Category oldCategory = new Category();
        oldCategory.setId(1L);
        oldCategory.setCategoryImage(categoryImage);
        oldCategory.setCategoryIllustration(illustrationImage); //creo categoria y seteo imagenes e id

        ArgumentCaptor<Category> categoryArgumentCaptor = ArgumentCaptor.forClass(Category.class); //creo el captor que va a capturar el Category con el cual es llamado el metodo save

        Mockito.when(this.categoryRepository.save(categoryArgumentCaptor.capture())).thenReturn(null); //acá defino que tiene q devolver el save del repositorio cuando sea llamado

        this.categoryService.updateCategory(new Category(), oldCategory);

        Category capturedCategory = categoryArgumentCaptor.getValue();

        Assert.assertNotNull(capturedCategory.getCategoryImage());
        Assert.assertNotNull(capturedCategory.getCategoryIllustration());
        Assert.assertEquals(10L, capturedCategory.getCategoryImage().getId(), 1);
        Assert.assertEquals(11L, capturedCategory.getCategoryIllustration().getId(), 1);
    }

    @Test
    public void testUpdateCategoryWhitCategoryImageInDBButNoIlustrationImageInDB() {
        Image categoryImage = new Image();
        categoryImage.setId(10L);
        Category oldCategory = new Category();
        oldCategory.setId(1L);
        oldCategory.setCategoryImage(categoryImage);

        Image illustrationImage = new Image();
        illustrationImage.setURL("url");
        Category requestCategory = new Category();
        requestCategory.setCategoryIllustration(illustrationImage);

        ArgumentCaptor<Category> categoryArgumentCaptor = ArgumentCaptor.forClass(Category.class);
        Mockito.when(this.categoryRepository.save(categoryArgumentCaptor.capture())).thenReturn(null);

        this.categoryService.updateCategory(requestCategory, oldCategory);

        Category capturedCategory = categoryArgumentCaptor.getValue();

        Assert.assertNotNull(capturedCategory.getCategoryImage());
        Assert.assertNotNull(capturedCategory.getCategoryIllustration());
        Assert.assertEquals(10L, capturedCategory.getCategoryImage().getId(), 1);
        Assert.assertEquals("url", capturedCategory.getCategoryIllustration().getURL());
    }

    @Test
    public void testCategoryUpdateWhitCategoyIllustrationinDBButNoCategoryImageInDB() {
        Image illustrationImage = new Image();
        illustrationImage.setId(10L);
        Category oldCategory = new Category();
        oldCategory.setId(1L);
        oldCategory.setCategoryIllustration(illustrationImage);

        Image categoryImage = new Image();
        categoryImage.setURL("url");
        Category requestCategory = new Category();
        requestCategory.setCategoryImage(categoryImage);

        ArgumentCaptor<Category> categoryArgumentCaptor = ArgumentCaptor.forClass(Category.class);
        Mockito.when(this.categoryRepository.save(categoryArgumentCaptor.capture())).thenReturn(null);

        this.categoryService.updateCategory(requestCategory, oldCategory);

        Category capturedCategory = categoryArgumentCaptor.getValue();

        Assert.assertNotNull(capturedCategory.getCategoryImage());
        Assert.assertNotNull(capturedCategory.getCategoryIllustration());
        Assert.assertEquals(10L, capturedCategory.getCategoryIllustration().getId(), 1);
        Assert.assertEquals("url", capturedCategory.getCategoryImage().getURL());
    }


    @Test
    public void testUpdateCategoryWhitImagesInRequest() {
        Category oldCategory = new Category();
        oldCategory.setId(1L);

        Image categoryImage = new Image();
        Image illustrationImage = new Image();
        categoryImage.setURL("url");
        illustrationImage.setURL("url");
        Category requestCategory = new Category();
        requestCategory.setCategoryImage(categoryImage);
        requestCategory.setCategoryIllustration(illustrationImage);

        ArgumentCaptor<Category> categoryArgumentCaptor = ArgumentCaptor.forClass(Category.class);
        Mockito.when(this.categoryRepository.save(categoryArgumentCaptor.capture())).thenReturn(null);

        this.categoryService.updateCategory(requestCategory, oldCategory);

        Category capturedCategory = categoryArgumentCaptor.getValue();

        Assert.assertNotNull(capturedCategory.getCategoryImage());
        Assert.assertNotNull(capturedCategory.getCategoryIllustration());
        Assert.assertEquals("url", capturedCategory.getCategoryImage().getURL());
        Assert.assertEquals("url", capturedCategory.getCategoryIllustration().getURL());
    }

    @Test
    public void testDeleteCategory() {
        Mockito.doNothing().when(this.categoryRepository).deleteById(eq(1L));

        this.categoryService.deleteCategory(1L);

        Mockito.verify(this.categoryRepository, times(1)).deleteById(eq(1L));
    }


}