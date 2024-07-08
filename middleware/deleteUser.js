
const deleteUser = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      delete req.body.email;
      delete req.body.password;
    }
    next();
  };
  
  export default deleteUser;
  