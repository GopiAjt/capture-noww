import Api from '@/services/Api';
import { email } from '@vuelidate/validators';

export default {
    addReview(c_id, p_id, rating, comment, token) {
        let requestBody = {
            customerId: c_id,
            photographerId: p_id,
            rating: rating,
            comment: comment,
            dateTime: new Date().toISOString()
        };
        console.log(requestBody);
        return Api().post('/customer/addReview', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    loadReviews(p_id, token) {
        return Api().get(`/customer/getReviewsById?id=${p_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    deleteReview(ratingId, token){
        return Api().delete(`/customer/deleteReviewsById?ratingId=${ratingId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    loadAlbums(p_id, token, offset, pageSize) {
        return Api().get(`/customer/getAlbumsById?id=${p_id}&offset=${offset}&pageSize=${pageSize}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    loadEquipments(p_id, token, offset, pageSize) {
        return Api().get(`/customer/getEquipmentsById?id=${p_id}&offset=${offset}&pageSize=${pageSize}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getFevorites(u_id, token) {
        return Api().get(`/customer/getAllFavorites?email=${u_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    getBookings(id, token) {
        return Api().get(`/customer/getBookingStatus?emailId=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    bookPackage(from, till, packageId, u_id, p_id, token) {

        const bookingRequestDto = {
            startDate: from,
            endDate: till,
            packageId: packageId, // package ID
            customerId: u_id, // customer ID
            photographerId: p_id, // photographer ID
            bookedDateTime: new Date().toISOString()
        };
        console.log(bookingRequestDto);

        return Api().post('/customer/createBooking', bookingRequestDto, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
    },
    cancelBooking(bookingId, authToken) {
        return Api().delete(`/customer/cancelBooking?bookingId=${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
    },
    updateDetails(customerUpdateDto, authToken) {
        return Api().post('/customer/updateDetails', customerUpdateDto, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
    },
    sendOtp(eId, authToken) {
        return Api().get(`/customer/resetPasswordOtp?emailId=${eId}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
    },
    resetPassword(resetData, token) {
        return Api().post('/customer/resetPassword', resetData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    removeFav(authToken, c_id, p_id) {
        return Api().delete(`/customer/removeFromFavorites?customerId=${c_id}&photographerId=${p_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
    },
    addFav(authToken, c_id, p_id) {
        return Api().get(`/customer/addToFavorites?customerId=${c_id}&photographerId=${p_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
    },
    getPackages(id, token) {
        return Api().get(`/customer/getPackages?email=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    searchByCategory(searchText, offset, pageSize) {
        return Api().get(`/customer/searchByPreference?pre=${searchText}&offset=${offset}&pageSize=${pageSize}`, {
            headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${user.authToken}`
                // Add any other headers as needed
            }
        })
    },
    sendForgotPasswordOtp(emailId){
        return Api().post(`/customer/forgotPasswordOtp?emailId=${emailId}`)
    },
    forgotPassword(emailId, newPass, otp){
        return Api().post(`/customer/forgotPassword?emailId=${emailId}&newPassword=${newPass}&otp=${otp}`)
    }
};
