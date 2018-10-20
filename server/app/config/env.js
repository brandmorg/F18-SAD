const env = {
    database: 'd77cun6o8d15fb',
    username: 'usxmkxocdndfam',
    password: '3c4f474c9b3adfc5797affd38c64471a20585dda527b5a7269157a6aa2ae904e',

    host: 'ec2-23-23-216-40.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        evict: 1000
    }
};
module.exports = env;