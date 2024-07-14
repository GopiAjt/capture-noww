import Api from '@/services/Api';
import { register } from 'module';

export default {
    register (cred){
        return Api().get('', cred)
    }
}