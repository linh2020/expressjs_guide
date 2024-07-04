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


// optimized version
// const verifyRoles = (...allowedRoles) => {
// By using a Set, the lookup for roles becomes faster compared to an array.
//   const rolesSet = new Set(allowedRoles);  // Convert allowedRoles to a Set for fast lookups
//   return (req, res, next) => {
//     if (!req?.roles) return res.sendStatus(401);

//     console.log("rolesSet: ", rolesSet); // rolesSet:  Set { 5150, 1984 }
//     console.log("req.roles: ", req.roles); // req.roles:  [ 2001, 1984, 5150 ]

// Check if any of the user's roles are in the allowed roles set
//     const hasRole = req.roles.some((role) => rolesSet.has(role));

//     if (!hasRole) return res.sendStatus(401);

//     next();
//   };
// };

// module.exports = verifyRoles;