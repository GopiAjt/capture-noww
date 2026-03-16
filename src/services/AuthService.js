import Api from '@/services/Api';

export default {
    addReview(c_id, p_id, rating, comment) {
        let requestBody = {
            customerId: c_id,
            photographerId: p_id,
            rating: rating,
            comment: comment,
            dateTime: new Date().toISOString()
        };
        console.log(requestBody);
        return Api().post('/customer/addReview', requestBody);
    },
    loadReviews(p_id) {
        return Api().get(`/customer/getReviewsById?id=${p_id}`);
    },
    deleteReview(ratingId) {
        return Api().delete(`/customer/deleteReviewsById?ratingId=${ratingId}`);
    },
    loadAlbums(p_id, token, offset, pageSize) {
        return Api().get(`/customer/getAlbumsById?id=${p_id}&offset=${offset}&pageSize=${pageSize}`);
    },
    loadEquipments(p_id, token, offset, pageSize) {
        return Api().get(`/customer/getEquipmentsById?id=${p_id}&offset=${offset}&pageSize=${pageSize}`);
    },
    getFevorites(u_id) {
        return Api().get(`/customer/getAllFavorites?email=${u_id}`);
    },
    getBookings(id) {
        return Api().get(`/customer/getBookingStatus?emailId=${id}`);
    },
    bookPackage(from, till, packageId, u_id, p_id) {
        const bookingRequestDto = {
            startDate: from,
            endDate: till,
            packageId: packageId,
            customerId: u_id,
            photographerId: p_id,
            bookedDateTime: new Date().toISOString()
        };
        console.log(bookingRequestDto);
        return Api().post('/customer/createBooking', bookingRequestDto);
    },
    cancelBooking(bookingId) {
        return Api().delete(`/customer/cancelBooking?bookingId=${bookingId}`);
    },
    updateDetails(customerUpdateDto) {
        return Api().post('/customer/updateDetails', customerUpdateDto);
    },
    sendOtp(eId) {
        return Api().get(`/customer/resetPasswordOtp?emailId=${eId}`);
    },
    resetPassword(resetData) {
        return Api().post('/customer/resetPassword', resetData);
    },
    removeFav(authToken, c_id, p_id) {
        return Api().delete(`/customer/removeFromFavorites?customerId=${c_id}&photographerId=${p_id}`);
    },
    addFav(authToken, c_id, p_id) {
        return Api().get(`/customer/addToFavorites?customerId=${c_id}&photographerId=${p_id}`);
    },
    getPackages(id) {
        return Api().get(`/customer/getPackages?email=${id}`);
    },
    searchByCategory(searchText, offset, pageSize) {
        return Api().get(`/customer/searchByPreference?pre=${searchText}&offset=${offset}&pageSize=${pageSize}`);
    },
    sendForgotPasswordOtp(emailId) {
        return Api().post(`/customer/forgotPasswordOtp?emailId=${emailId}`);
    },
    forgotPassword(emailId, newPass, otp) {
        return Api().post(`/customer/forgotPassword?emailId=${emailId}&newPassword=${newPass}&otp=${otp}`);
    }
};

