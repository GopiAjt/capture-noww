import Api from '@/services/Api';

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
    }
};
