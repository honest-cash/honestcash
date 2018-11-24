export default class BitcoinService {
    constructor ($http, API_URL) {
        const validateAddress = async (address) => {
            const res = $http.get(API_URL + "/bitcoin/utils/validate/" + address)
            
            return res.data;
        };

        this.validateAddress = validateAddress;
    }
}
