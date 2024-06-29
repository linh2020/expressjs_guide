const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];
    console.log("rolesArray: ", rolesArray); // rolesArray:  [ 5150, 1984 ]
    console.log("req.roles: ", req.roles); // req.roles:  [ 2001, 1984, 5150 ]

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((e) => e === true);

    if (!result) return res.sendStatus(401);

    next();
  };
};

module.exports = verifyRoles;
