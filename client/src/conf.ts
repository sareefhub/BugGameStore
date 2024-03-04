const isProd = process.env.NODE_ENV === 'production';

const conf = {
    isProd,
    apiPrefix: isProd? 'https://sda-project-416115.as.r.appspot.com' : 'https://sda-project-416115.as.r.appspot.com'
}

export default conf;
