import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
    return open('../data/users.csv')
        .split('\n')
        .slice(1) 
        .filter(Boolean)
        .map(line => {
            const [user, passwd] = line.split(',');
            return { user: user.trim(), passwd: passwd.trim() };
        });
});

export const options = {
    stages: [
        { duration: '1m', target: 20 },  
        { duration: '2m', target: 20 },  
        { duration: '30s', target: 0 }   
    ],
    thresholds: {
        http_req_duration: ['p(95)<1500'],
        http_req_failed: ['rate<0.03'],
    },
};

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];

    const payload = JSON.stringify({
        username: user.user,
        password: user.passwd,
    });

    const headers = { 'Content-Type': 'application/json' };

    const res = http.post('https://fakestoreapi.com/auth/login', payload, { headers });

    check(res, {
        'status es 200': (r) => r.status === 200,
        'tiempo respuesta < 1.5s': (r) => r.timings.duration < 1500,
    });

    sleep(1);
}