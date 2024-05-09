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

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await prisma.user.findFirst({
      where: {
        emailAddress: email,
      },
      include:{
        role: true,
        person: {
          include:{
            recommendations: true
          }
        },
        company: {
          include:{
            industry:{
              include:{
                industry: true
              }
            }
          }
        }
      }
    });

    
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return exclude(user,['password']);
      }
    } 
    
  } catch (error) {
    res.status(400).json({ error: "Invalid credentials" });
    // console.log(error);
  }
};

const loginReceive = async (req, res) => {
    const { email, password } = req.body;
    // console.log("login creds receive")
    try {
        const user = await loginUser({ body: { email, password } }, res);
        if (user.verified != true) {
          throw new Error("Pending account verification");
        }

        if (user.isArchived == true) {
          throw new Error("Account is deactivated");
        }

        if (user.isBanned == true) {
          throw new Error("Account is banned");
        }
        const token = createToken(user.id)
        res.cookie('jwt', token,{httpOnly:true, maxAge:maxAge*1000})
        res.cookie('email', user.emailAddress,{httpOnly:true, maxAge:maxAge*1000})
        res.status(200).json({ user: user});
    } catch (error) {
      if (error.message === "Pending account verification"){
        res.status(400).json({ error: "Pending account verification" });
      }else if(error.message === "Account is deactivated"){
        console.log(error.message)
        res.status(400).json({ error: "Account is deactivated" });
      }else if(error.message === "Account is banned"){
        res.status(400).json({ error: "Account is banned, contact administrator" });
      }
      else{
        res.status(400).json({ error: "Invalid credentials" });
      }
        

    }    
}


//example
const logoutUser = async (req, res) => {
  try {
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/login')
  } catch (error) {
    console.log(error);
  }
};

const getEmailCookie = async (req, res) => {
  try {
    const emailCookie = req.cookies
    res.json(emailCookie.email)
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, "Pedo Mellon a Minno");
    const userId = decodedToken.id;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include:{
        role: true,
        person: {
          include:{
            recommendations: true
          }
        },
        company: {
          include:{
            industry:{
              include:{
                industry: true
              }
            }
          }
        }
      }
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
   
    res.status(200).json({ user: user});
  } catch (error) {
    console.error(error);
    // Send a 400 error response
    res.status(400).json();
  }
};


module.exports = {
  loginUser,
  logoutUser,
  loginReceive,
  getEmailCookie,
  getCurrentUser
};
