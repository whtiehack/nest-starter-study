
export const funLoggerMiddleware = (req, res, next) => {
    console.log(`funLoggerMiddleware !!Request...`);
    next();
};
