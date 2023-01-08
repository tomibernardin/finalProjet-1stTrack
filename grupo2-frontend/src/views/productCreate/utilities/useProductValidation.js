import { useState } from "react";

export const useProductValidation = (data) => {

    const [error, setError] = useState({});
    
    const validation = {
        general : () => {
            let valid = true;

            let errAux = {
                category: null,
                beds : null,
                bathrooms : null,
                guests: null,
                rooms: null,
                dailyPrice: null
            };


            if (!fields.category()) {
                errAux.category = "Please, choose one category";
                valid = false
            }
            if (!fields.rooms()) {
                errAux.rooms = "Please, choose a valid amount";
                valid = false
            }
            if (!fields.beds()) {
                errAux.beds = "Please, choose a valid amount";
                valid = false
            }
            if (!fields.guests()) {
                errAux.guests = "Please, choose a valid amount";
                valid = false
            }
            if (!fields.bathrooms()) {
                errAux.bathrooms = "Please, choose a valid amount";
                valid = false
            }
            
            setError({...error, ...errAux});

            return valid;
        },
        information : () => {
            let valid = true;

            let errAux = {
                title: null,
                city : null,
                address : null,
                number: null,
                // floor: null,
                // apartment: null,
                description: null,
            };

            if (!fields.title()) {
                errAux.title = "Title must be between 10 and 40 characters";
                valid = false;
            }
            if (!fields.city()) {
                errAux.city = "City is not valid";
                valid = false;
            }
            if (!fields.address()) {
                errAux.address = "Please, enter a valid address";
                valid = false;
            }
            if (!fields.dailyPrice()) {
                errAux.dailyPrice = "Please, enter a valid price";
                valid = false;
            }
            if (!fields.number()) {
                errAux.number = "Number not valid";
                valid = false;
            }
            // if (!fields.floor()) {
            //     errAux.floor = "Please, choose a valid amount";
            //     valid = false;
            // }
            // if (!fields.apartment()) {
            //     errAux.apartment = "Please, choose a valid amount";
            //     valid = false;
            // }
            if (!fields.description()) {
                errAux.description = "Description must be between 40 and 360 characters";
                valid = false;
            }
            setError({...error, ...errAux});

            return valid;
        },
        features : () => {
            if (!fields.features()) {
                setError({...error, features : "Please, select at least three (3) features"});
                return false
            } else { 
                setError({...error, features : null });
                return true 
            }
        },
        policies : () => {
            if (!fields.policies()) {
                setError({...error, policies : "Please, select at least five (5) policies"});
                return false
            } else { 
                setError({...error, policies : null });
                return true 
            }
        },
        images : () => {
            if (!fields.images()) {
                setError({...error, images : "Please, select at least three (3) features"});
                return false
            } else { 
                setError({...error, images : null });
                return true 
            }
        },
        imagesEdit : () => {
            if (!fields.imagesEdit()) {
                setError({...error, images : "Please, keep at least three (3) images"});
                return false
            } else { 
                setError({...error, images : null });
                return true 
            }
        }
    }

    const fields = {
        category : () => data.category !== null,
        rooms : () => data.rooms !== null && data.rooms > 0,
        beds : () => data.beds !== null && data.beds > 0 ,
        guests : () => data.guests !== null && data.guests > 0,
        bathrooms : () => data.bathrooms !== null && data.bathrooms > 0,
        features: () => data.features_id && data.features_id.length >= 3,
        policies: () => data.policyItems_id && data.policyItems_id.length >= 5,
        images: () => data.image && data.image.length >= 3,
        imagesEdit: () => data.images.length - data.removeImages.length +  data.addImages.length >= 3,
        title : () => data.title && data.title.length >= 10 && data.title.length <= 40,
        city: () => data.city_id && (typeof data.city_id === 'number'),
        description: () => data.description && data.description.length >= 40 && data.description.length <= 360,
        address: () => data.address && data.address.length >= 3 && data.address.length <= 30,
        number: () => data.number && (typeof data.number === 'number') && data.number < 99999,
        // floor: () => data.floor && (typeof data.floor === 'number') && data.floor < 99999,
        dailyPrice: () => data.dailyPrice && (typeof data.dailyPrice === 'number') && data.dailyPrice > 0 && data.dailyPrice < 9999,

    }

    return {validation, error};
}