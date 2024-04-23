const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60; //3 days
const createToken = (id) => {
  return jwt.sign({ id }, "Pedo Mellon a Minno", {
    expiresIn: maxAge,
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        emailAddress: email,
      },
      include:{
        role: true
      }
    });

    
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
    } 
    
  } catch (error) {
    res.status(400).json({ error: "Invalid credentials" });
    // console.log(error);
  }
};

const loginReceive = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginUser({ body: { email, password } }, res);
        const token = createToken(user.id)
        res.cookie('jwt', token,{httpOnly:true, maxAge:maxAge*1000})
        res.status(200).json({ user: user.id, role: user.role.roleName});
    } catch (error) {
        res.status(400).json({ error: "Invalid credentials" });

    }    
}


//example
const logoutUser = async (req, res) => {
  try {
    console.log("logout clicked")
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/login')
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  loginReceive
};
