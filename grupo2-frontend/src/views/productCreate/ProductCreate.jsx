import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon, CheckCircleIcon, CheckIcon, ExclamationTriangleIcon, MapPinIcon, PaperClipIcon, PhotoIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Datalist, DatalistItem } from '../../components/datalist';
import { Input } from '../../components/input/Input';
import { BaseLayout } from '../../components/layout/BaseLayout';
import { HeaderNav } from '../../components/partials';
import { Textarea } from '../../components/textarea/Texarea';
import { useLoadingViewContext } from '../../context/LoadingViewContext';
import { useSearchContext } from '../../context/SearchContext';
import { useUserContext } from '../../context/UserContext';
import { FetchRoutes, PrivateRoutes } from '../../guard/Routes';
import { usePreviewImage } from '../../hooks/useFilePreview';
import { FormStep } from './components/FormStep';
import { CountSelect } from '../../components/partials/searchNavbar/components/CountSelect';
import { PropertyTypeSelect } from '../../components/partials/searchNavbar/components/PropertyTypeSelect';
import { useProductValidation } from './utilities/useProductValidation';
import { Modal } from '../../components/modal/Modal';
import './productCreate.css';

export const ProductCreate = () => {

    const {
        status,
        startLoading,
        loadDone
      } = useLoadingViewContext()

      const { user } = useUserContext();
      const { categories, cities } = useSearchContext();
      const [features, setFeatures ] = useState(null);
      const [policies, setPolicies ] = useState(null);
      const [modal, setModal ] = useState(false);
      const [errorModal, setErrorModal ] = useState(false);
      const [featureModal, setFeatureModal ] = useState(false);
      const [errorFeatureModal, setErrorFeatureModal] = useState({
        name: null,
        featureImage: null
      });

      const [featureForm, setFeatureFrom ] = useState({
        name: '',
        featureImage: null
      })

      const navigate = useNavigate();

      const fetchData = async () => {
        try {
          startLoading();
          const { data : featuresList } = await axios.get(`${FetchRoutes.BASEURL}/feature`,
          { headers: { Authorization : user.authorization }})
          setFeatures(featuresList);
          const { data : policiesList } = await axios.get(`${FetchRoutes.BASEURL}/policyitem`,
          { headers: { Authorization : user.authorization }})
          setPolicies(policiesList);

        } catch (error) {
          console.error(error.message);
          navigate('/bad-request')
        } finally{ loadDone() };
    }
    
    useEffect(() => {
        if (!features ) { fetchData() } 
        else{ loadDone() }
    }, [])

    const initialState = {
        title: '',
        description : '',
        category: null,
        features: [],
        policies: [],
        city: null,
        address: '',
        number : '',
        floor : '',
        apartment: '',
        guests: null,
        bathrooms: null,
        rooms: null,
        beds: null, 
        dailyPrice : 0.00
    }

    const [ form, setForm ] = useState(initialState)

    const [ validated, setValidated ] = useState({
        general: null,
        information : null,
        features : null,
        policies : null,
        images : null
    })

    const incluidesFeature = id => form.features.includes(id);

    const addFeature = id => setForm({...form, features: [...form.features, id]});

    const removeFeature = id => setForm({...form, features: form.features.filter(item => item !== id)});

    const incluidesPolicy = id => form.policies.includes(id);

    const addPolicy = id => setForm({...form, policies: [...form.policies, id]});

    const removePolicy = id => setForm({...form, policies: form.policies.filter(item => item !== id)});
    
    const {images, imageFiles, changeHandler, removeHandler, addHandler} = usePreviewImage()


        const bodyReq = {
            ...form, 
            user_id: user.id,
            dailyPrice: +form.dailyPrice,
            image: imageFiles,
            features_id : form.features,
            category_id: form.category,
            city_id: form.city?.id,
            number: +form.number,
            floor: +form.floor,
            policyItems_id: form.policies,     
        }
        
        const {validation, error} = useProductValidation(bodyReq)

    const postData = async () => {
        try {
          startLoading();
          await axios.post(`${FetchRoutes.BASEURL}/product`,
          bodyReq,
          { headers: { 
            Authorization : user.authorization, 
            'Content-Type': "multipart/form-data"
        }})
        //if everything ok
        setModal(true)

        } catch (error) {
          console.error(error.message);
        setErrorModal(true)
        //   navigate('/bad-request')
        } finally{ loadDone() };
    }

    const postFeature = async () => {
        const featureData = {
            name: featureForm.name,
            image_id: +featureForm.featureImage.featureImage.id
          }
        try {
          await axios.post(`${FetchRoutes.BASEURL}/feature`,
          featureData,
          { headers: { 
            Authorization : user.authorization
        }})
        setFeatureModal(false);

        } catch (error) {
          console.error(error.message);
          setFeatureModal(false);

        // setErrorModal(true)
        } finally{ 
            fetchData();
            setFeatureFrom({
                name: '',
                featureImage: null
            });
         };
    }

    const handleFeatureSubmit = () => {
        if (!(featureForm.name.length > 2 && featureForm.name.length < 21)){
            setErrorFeatureModal({...errorFeatureModal, name: 'Please, enter a name between 3 and 20 characters.'});
            return;
        } else { setErrorFeatureModal({...errorFeatureModal, name: null })}
        if (!featureForm.featureImage){
            setErrorFeatureModal({...errorFeatureModal, featureImage: 'Please, enter a valid icon.'});
            return;
        } else { setErrorFeatureModal({...errorFeatureModal, featureImage: null })}

        postFeature();
    }

    const handleSubmit = () => {
        if (validation.general() === true &&
        validation.information() === true &&
        validation.features() === true &&
        validation.policies() === true &&
        validation.images() === true 
        ) {
            postData()
        } else {
            setErrorModal(true);
        }
    }

  return (
    <>
        <HeaderNav />
        <BaseLayout
          wrapperClassName="bg-logo-hero-search"
          padding='px-3 pt-20 lg:pt-24'
        >
            <div className='flex items-end justify-between w-full py-6'>
                <h1 className='text-2xl font-semibold text-white'>List new place</h1>
                <ArrowLeftIcon
                onClick={() => navigate(-1)}
                className="text-white w-10 h-10" />
            </div>
        </BaseLayout>
        <BaseLayout
          padding='px-3 pt-4 md:pt-6'
          className="relative mb-10 flex flex-col-reverse 
          lg:grid lg:gap-8 min-h-screen product-create-container overflow-visible h-auto"
        >
            <article className='lg:sticky lg:top-32 lg:self-start'>
                <p className='font-semibold text-gray-900 text-xl my-4 '>
                    Preview
                </p>
                <div className='w-[350px] rounded-xl
                bg-white border-2 border-violet-700'>
                    <div className='flex items-center justify-center w-full h-60 p-3 overflow-hidden'>
                        {images.length > 0 ?
                        <img
                        src={images[0]}
                        alt='preview-image'
                        className='w-full h-full object-cover rounded-xl'
                        />
                        :
                        <div className='w-full h-full border-2
                        flex items-center justify-center 
                        text-gray-300 border-gray-300 rounded-xl'>
                            <PhotoIcon className='w-20 h-20 ' />
                        </div>
                        }
                    </div>
                    <div className='p-2 flex flex-col items-start text-left gap-1'>
                        <p className='font-medium text-xl text-gray-900 mb-1
                        max-w-[22ch] overflow-ellipsis whitespace-nowrap overflow-hidden'>{form.title ? form.title : 'Charming title'}</p>
                        <div className='flex items-center text-violet-700'>
                            <MapPinIcon className='w-6 h-6 mr-1'/>
                            <p className=''>{form.city ? `${form.city.name}, ${form.city.country.name}` : 'Chose a city'}</p>
                        </div>
                        <p className='ml-1 text-gray-500 max-h-40 
                        overflow-hidden overflow-ellipsis'>
                            {form.description ? form.description : 'brief description about the place, with a maximum of 260 characters.'}
                        </p>
                    </div>
                </div>
                <div className='mt-10'>
                        <button onClick={handleSubmit} className='w-32 py-3 rounded-lg text-white bg-violet-700 font-medium'>
                            Submit
                        </button>
                    </div>
            </article>
            <div className='flex flex-col relative'>
                <FormStep
                status={validated.general}
                setStatus={e => setValidated({...validated, general: e})}
                initial
                validate={() => setValidated({...validated, general: validation.general()})}
                title='General'>
                    <div className='mb-4'>
                        <h5 className='text-xl font-medium text-gray-600 px-2 mb-2'>Category</h5>
                        
                        <div className='flex items-start gap-2 md:gap-4 cursor-pointer'>
                        {
                            categories?.map((category, i) => (
                                <PropertyTypeSelect
                                key={i}
                                name={category.title}
                                illustration={category.categoryIllustration.url}
                                onClick={() => setForm({...form, category: category.id})}
                                selected={form?.category === category.id} 
                                />
                            ))
                        }
                        </div>
                        {error?.category && 
                        <p className='text-sm text-red-400 ml-2'>{error.category}</p>}
                    </div>
                    <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-2'>
                        <div>
                            <h5 className='text-lg font-medium text-gray-600 px-2'>Rooms</h5>
                            <CountSelect
                                value={form.rooms}
                                setValue={(value) => setForm({...form, rooms: value})}
                                />
                            {error?.rooms && 
                            <p className='text-sm text-red-400 ml-2'>{error.rooms}</p>}
                        </div>
                        <div>
                            <h5 className='text-lg font-medium text-gray-600 px-2'>Beds</h5>
                            <CountSelect 
                                value={form.beds}
                                setValue={(value) => setForm({...form, beds: value})}
                            />
                            {error?.beds && 
                            <p className='text-sm text-red-400 ml-2'>{error.beds}</p>}
                        </div>
                        <div>
                            <h5 className='text-lg font-medium text-gray-600 px-2'>Bathrooms</h5>
                            <CountSelect
                                value={form.bathrooms}
                                setValue={(value) => setForm({...form, bathrooms: value})}
                            />
                            {error?.bathrooms && 
                            <p className='text-sm text-red-400 ml-2'>{error.bathrooms}</p>}
                        </div>
                        <div>
                            <h5 className='text-lg font-medium text-gray-600 px-2'>Maximum guest</h5>
                            <CountSelect
                                value={form.guests}
                                setValue={(value) => setForm({...form, guests: value})}
                            />
                            {error?.guests && 
                            <p className='text-sm text-red-400 ml-2'>{error.guests}</p>}
                        </div>
                    </div>
                </FormStep>
                <FormStep
                status={validated.information}
                setStatus={e => setValidated({...validated, information: e})}
                reset={() => {}}
                initial
                validate={() => setValidated({...validated, information: validation.information()})}
                title='Basic information'>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6  place-items-start' >
                        <Input
                        label='Title'
                        id='product_title'
                        type='text'
                        placeholder='Exotic apartment in front of the sea...'
                        error={error.title}
                        errorMessage={error.title}
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        />
                        <Datalist
                            label="City"
                            data={cities}
                            value={form.city ? `${form.city?.name},  ${form.city?.country.name}` : null}
                            id='locations_dsk_filter'
                            placeholder='Search around the world'
                            error={error.city}
                            errorMessage={error.city}
                            onChange={(e) => setForm({...form, city: e})}
                            resultRenderer={(city, i) => (
                            <DatalistItem
                                key={i}
                                name={`${city.name}, ${city.country.name}`}
                                id={city.id}
                                value={city}
                                icon={<MapPinIcon className='w-6 h-6 mr-2 text-violet-600' />}
                            />)}
                        />

                        <Input
                        label='Adress'
                        id='product_adress'
                        type='text'
                        placeholder='St Martin Street...'
                        value={form.address}
                        error={error.address}
                        errorMessage={error.address}
                        onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                        }/>
                        <div className='grid grid-cols-3 gap-2 md:gap-4 place-items-start'>
                            <Input
                            label='Number'
                            id='product_adress_number'
                            type='number'
                            placeholder='2301'
                            error={error.number}
                            errorMessage={error.number}
                            value={ form.number }
                            onChange={(e) =>
                                setForm({ ...form, number: e.target.value })
                            }/>
                            <Input
                            label='Floor'
                            id='product_adress_floor'
                            type='number'
                            placeholder='2301'
                            value={ form.floor }
                            onChange={(e) =>
                                setForm({ ...form, floor: e.target.value })
                            }/>
                            <Input
                            label='Apartment'
                            id='product_adress_apartment'
                            type='text'
                            placeholder='2301'
                            value={ form.apartment }
                            onChange={(e) =>
                                setForm({ ...form, apartment: e.target.value })
                            }/>
                        </div>
                        <Textarea
                        label='Description'
                        id='product_description'
                        className='md:col-span-2'
                        error={error.description}
                        errorMessage={error.description}
                        placeholder='Brief description about the place, max. 260 characters'
                        value={form.description}
                        rows="4"
                        maxLength="160"
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        />
                        <Input
                        label='Daily price'
                        id='product_daily_price'
                        type='number'
                        placeholder='200'
                        min={0}
                        max={9999}
                        error={error.dailyPrice}
                        errorMessage={error.dailyPrice}
                        value={ form.dailyPrice }
                        onChange={(e) =>
                            setForm({ ...form, dailyPrice: e.target.value })
                        }/>
                    </div>
                    
                </FormStep>
                <FormStep
                status={validated.features}
                setStatus={e => setValidated({...validated, features: e})}
                initial
                validate={() => setValidated({...validated, features: validation.features()})}
                title='Features'>
                    <p className='text-gray-400 mb-4'>Please, select at least three features:</p>
                    <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-6' >
                        {features?.map(feature => (
                            <div className={`flex flex-col flex-wrap items-center justify-start 
                            gap-2 p-2 rounded-lg bg-violet-50 text-gray-600
                            ${incluidesFeature( feature.id) ? '' : 'grayscale opacity-50 '}` 
                            }
                            onClick={ () => incluidesFeature( feature.id) ? removeFeature(feature.id) : addFeature(feature.id) }
                            key={feature.id}
                            >
                                <img
                                src={feature?.featureImage.url}
                                alt={feature?.featureImage.description}
                                className='w-10 h-10'
                                />
                                <p className='text-sm sm:text-base whitespace-nowrap 
                                max-w-[100%] overflow-hidden overflow-ellipsis'>{feature.name}</p>
                            </div>
                        ))}
                        <div 
                        onClick={() => setFeatureModal(true)}
                        className='flex flex-col flex-wrap items-center justify-start 
                            gap-2 p-2 border-2 border-violet-400 rounded-lg cursor-pointer'>
                                <PlusCircleIcon className='w-8 h-8 text-gray-500' />
                                <p className='text-sm sm:text-base whitespace-nowrap 
                                max-w-[100%] overflow-hidden overflow-ellipsis text-gray-500'>Add</p>
                        </div>
                    </div>
                    {error?.features && 
                        <p className='text-sm text-red-400 ml-2 mt-4'>{error.features}</p>}
                </FormStep>
                <FormStep
                status={validated.policies}
                initial
                setStatus={e => setValidated({...validated, policies: e})}
                validate={() => setValidated({...validated, policies: validation.policies()})}
                title='Policies'>
                    <p className='text-gray-400 mb-4'>Please, select at least five policies:</p>
                     <div className='grid grid-cols-1 md:grid-cols-2 gap-4 place-items-start' >
                        {policies?.map((policy, i) => (
                            <div 
                            key={i} 
                            className={`flex items-start cursor-pointer 
                            ${incluidesPolicy( policy.id) ? 'text-gray-800 font-medium' : 'text-gray-500'}`}

                            onClick={ () => incluidesPolicy( policy.id) ? removePolicy(policy.id) : addPolicy(policy.id) }
                            >
                                <div className='w-6 h-6 rounded border mr-2 mt-2 shrink-0'>
                                    {incluidesPolicy(policy.id) && 
                                        <CheckIcon className={`w-6 h-6 text-violet-700`} />
                                    }
                                </div>
                                <div className='flex flex-col items-start'>
                                    <p className="">{ policy.name }</p>
                                    <p className={`text-sm
                                    ${incluidesPolicy( policy.id) ? 'text-violet-600' : 'text-violet-400'}`}>
                                        In {policy.policy.name}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                     {error?.policies && 
                    <p className='text-sm text-red-400 ml-2 mt-4'>{error.policies}</p>}
                </FormStep>
                <FormStep
                status={validated.images}
                initial
                setStatus={e => setValidated({...validated, images: e})}
                validate={() => setValidated({...validated, images: validation.images()})}
                title='Add images'>
                <p className='text-gray-400 mb-4'>Please, add at least three images:</p>
                <input
                name='product_photos'
                id='product_photos'
                multiple
                className='w-0 h-0 opacity-0'
                type='file'
                accept="image/*"
                onChange={(e) => {images.length > 0 ? addHandler(e) : changeHandler(e); }}
                />

                <div className='flex overflow-hidden grow-0'>
                    <div className='flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4'>
                    { 
                    images.map((item, i) => (
                        <div key={i}  
                        className='w-48 h-48 rounded-xl overflow-hidden 
                        shrink-0 relative'>
                            <img src={item}
                            className="w-full h-full object-cover"
                            alt='image-preview' />
                            <button
                            onClick={() => removeHandler(i)}
                            className='w-10 h-10 absolute top-3 right-3 rounded-full
                            flex items-center justify-center bg-red-400'>
                                <XMarkIcon className='w-6 h-6 text-white' />
                            </button>
                        </div>
                    ))}
                    { 
                    images.length <= 10 &&
                        <label 
                        htmlFor='product_photos'
                        className='w-48 h-48 border-2 border-gray-400
                        flex flex-col items-center justify-center cursor-pointer
                        bg-gray-50 text-gray-400 rounded-xl shrink-0 '>
                            <p className='font-medium text-lg'>Add files</p>
                            <PaperClipIcon className='w-14 h-14' />
                        </label>      
                    }
                    </div>
                </div>
                {error?.images && 
                <p className='text-sm text-red-400 ml-2 mt-4'>{error.images}</p>}
                </FormStep>
            </div>
            
        </BaseLayout>
        <Modal
        isOpen={modal}
        closeModal={() => {navigate(PrivateRoutes.USERPRODUCTSID(user.id)); startLoading()}}
        >
        <div className='w-screen max-w-[90vw] md:max-w-lg max-h-96 
        bg-white rounded-lg flex flex-col items-center p-4 shadow-xl'>
            <CheckCircleIcon className='w-20 h-20 mb-4 text-violet-700' />

            <p className='text-xl md:text-2xl font-medium mb-2 text-gray-800'>Product created</p>
            <p className='md:text-lg text-gray-600 mb-4'>We have sent you an email with all the details</p>
            <button
            onClick={() => { navigate(PrivateRoutes.USERPRODUCTSID(user.id)); startLoading() }}
            className="py-3 w-32 text-white bg-violet-700
            rounded-md text-lg font-medium">
            Awesome!
            </button>
        </div>
        </Modal>
        <Modal
        isOpen={errorModal}
        closeModal={() => { setErrorModal(false); }}
        >
        <div className='w-screen max-w-[90vw] md:max-w-lg max-h-96 
        bg-white rounded-lg flex flex-col items-center p-4 shadow-xl'>
            <ExclamationTriangleIcon className='w-20 h-20 mb-4 text-yellow-500' />

            <p className='text-xl md:text-2xl font-medium mb-2 text-gray-800'>Something went wrong</p>
            <p className='md:text-lg text-gray-600 mb-4'>Please the data entered and try again</p>
            <button
            onClick={() => { setErrorModal(false); }}
            className="py-3 w-32 text-white bg-violet-700
            rounded-md text-lg font-medium">
            I understand
            </button>
        </div>
        </Modal>
        <Modal
        isOpen={featureModal}
        closeModal={ () => setFeatureModal(false) }
        >
        <div className='w-screen max-w-[90vw] md:max-w-lg max-h-96 gap-6
        bg-white rounded-lg flex flex-col items-center p-4 shadow-xl'>

            <p className='text-xl md:text-2xl font-medium mb-2 text-gray-800'>Create feature</p>
            <Input
            label='Name'
            id='feature_name'
            type='text'
            placeholder='Microwave...'
            error={errorFeatureModal.name}
            errorMessage={errorFeatureModal.name}
            value={featureForm.name}
            onChange={(e) =>
                setFeatureFrom({ ...featureForm, name: e.target.value })
            }
            />
            <Datalist
            label="Icon"
            data={features}
            value={featureForm?.featureImage ? featureForm.featureImage.name : null}
            id='feature_icon'
            placeholder='Select one from the list...'
            error={errorFeatureModal.featureImage}
            errorMessage={errorFeatureModal.featureImage}
            onChange={(e) => setFeatureFrom({...featureForm, featureImage: e})}
            resultRenderer={(feature, i) => (
            <DatalistItem
                key={i}
                name={feature.featureImage.name}
                id={feature.id}
                value={feature}
                icon={<img src={feature.featureImage?.url} className='w-6 h-6 mr-2 text-violet-600' />}
            />)}
            />
            <button
            disabled={status === 'LOADING'}
            onClick={() => { () => setFeatureModal(false); handleFeatureSubmit() }}
            className="py-3 w-32 text-white bg-violet-700
            rounded-md text-lg font-medium">
                Send
            </button>
        </div>
        </Modal>
    </>
  )
}
