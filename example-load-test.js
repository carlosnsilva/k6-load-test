import http from 'k6/http'
import {check, group, sleep} from 'k6'

export const options = {
    stages: [
        {duration: '5m', target: 100 },
        {duration: '5m', target: 25  },
        {duration: '5m', target: 0   }
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], 
    
    },
};

const BASE_URL = 'http://localhost:8080'

export default () => {
    const response = http.get(`${BASE_URL}/k6/test/get`)

    check(response, {
        'logged in successfully': resp => {
            return resp.status == 200;
        }
    })

    sleep(1)
}