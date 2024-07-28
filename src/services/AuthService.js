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
    }
};
