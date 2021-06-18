const router=require("express").Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");
const Organisation=mongoose.model("Organisation");
const Country=mongoose.model("Country");
const bcrypt=require('bcryptjs');

// admin add user
const UserValidationByAdmin=(user,role,res,userdets)=>{
if(role==="campus-ambassador" || role==="voulenteer")
{
    campusSignup(user,role,userdets,res,'admin')
}
else if(role==="organisation")
{
    orgSignup(user,role,userdets,res,'admin')
}
else if(role==="country-ambassador")
{
    countrySignup(user,role,userdets,res,'admin')
}
}
//organisation add user

const UserValidationByOrg=(user,role,res,userdets)=>{
    if(role==="campus-ambassador" || role==="voulenteer")
    {
        campusSignupByOrg(user,role,userdets,res,'organisation')
    }else
    if(role==="country-ambassador")
    {
        countrySignupByOrg(user,role,userdets,res,'organisation')
    }
  
}
const UserValidationByCountry=(user,role,res,userdets)=>{
    if(role==="campus-ambassador" || role==="voulenteer")
    {
        campusSignupByCountry(user,role,userdets,res,'country-ambassador')
    }
  
}


//admin adds campuss and voultenreer
const campusSignup=(user,role,userdets,res,addedby)=>{
    const {email,password,name,dob,number,state,
            country,pin,residence,city,description,
            college,facebook,linkedin,instagram} = user;
    if(!email || !password)
{
    res.status(422).json({err:"incomplete fields"});
}
User.findOne({email:email})
.then(getuser=>{
    if(getuser)
    {
        return res.status(422).json({err:"user already exist"});
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
            const user=new User({
                email,
                addedByAdmin:userdets._id,
                password:hashed,
                name,
                dob,
                number,
                state,
                country,
                pin,
                residence,
                city,
                role,
                description,
                college,facebook,linkedin,instagram
            })
        user.save()
        .then(response=>{
            res.json({success:"you are successfully registered"});
        })
        .catch(err=>{
            res.json({err:err})
        })
    })
    .catch(err=>{
        res.json({err:err})
    })
   
})
.catch(err=>{
    res.json({err:err})
})
}

// admin adds organisation
const orgSignup=(user,role,userdets,res)=>{
    const { password,
        email,
        name,
        website,
        number,
        state,
        country,
        type,
        description,
        scope,
        city,
        facebook,linkedin,instagram
        } = user;
    
    if(!email || !password)
    {
        res.status(422).json({err:"incomplete fields"});
    }
    Organisation.findOne({email:email})
    .then(getuser=>{
        if(getuser)
        {
            return res.status(422).json({err:"user already exist"});
        }
        bcrypt.hash(password,12)
        .then(hashed=>{
            const Org=new Organisation({
                email,
                name,
                website,
                number,
                state,
                country,
                type,
                description,
                scope,
                city,
                password:hashed,
                role,
                facebook,linkedin,instagram
            })
            Org.save()
            .then(response=>{
                res.json({success:"you are successfully registered",res:response});
            })
            .catch(err=>{
                res.json({err:err})
            })
        })
        .catch(err=>{
            res.json({err:err})
        })
       
    })
    .catch(err=>{
        res.json({err:err})
    })
    }

//admin add country
const countrySignup=(user,role,userdets,res,addedby)=>{
    const {email,password,name,dob,number,
        state,country,pin,residence,city,description,
        college,facebook,linkedin,instagram} = user;
    if(!email || !password)
{
    res.status(422).json({err:"incomplete fields"});
}
Country.findOne({email:email})
.then(getuser=>{
    if(getuser)
    {
        return res.status(422).json({err:"user already exist"});
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
            const count=new Country({
                email,
                addedByAdmin:userdets._id,
                password:hashed,
                name,
                dob,
                number,
                state,
                country,
                pin,
                residence,
                city,
                role,
                description,
                college,facebook,linkedin,instagram
            })
        count.save()
        .then(response=>{
            res.json({success:"you are successfully registered"});
        })
        .catch(err=>{
            console.log(err);
            res.json({err:err})
        })
    })
    .catch(err=>{
        console.log(err);
        res.json({err:err})
    })
   
})
.catch(err=>{
    console.log(err);
    res.json({err:err})
})
}
// organisation adds user and voulenteer
const campusSignupByOrg=(user,role,userdets,res,addedby)=>{
    const {email,password,
        college,facebook,linkedin,instagram,description,
        name,dob,number,state,country,pin,residence,city} = user;
    if(!email || !password)
{
    res.status(422).json({err:"incomplete fields"});
}
User.findOne({email:email})
.then(getuser=>{
    if(getuser)
    {
        return res.status(422).json({err:"user already exist"});
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
            const user=new User({
                email,
                addedByOrg:userdets,
                password:hashed,
                name,
                dob,
                number,
                state,
                country,
                pin,
                residence,
                city,
                role,
                description,
                college,facebook,linkedin,instagram
            })
        user.save()
        .then(response=>{
            res.json({success:"you are successfully registered"});
        })
        .catch(err=>{
            res.json({err:err})
        })
    })
    .catch(err=>{
        res.json({err:err})
    })
   
})
.catch(err=>{
    res.json({err:err})
})
}

//organisation adds country
const countrySignupByOrg=(user,role,userdets,res,addedby)=>{
    const {email,password,name,dob,number,state,description,
        college,facebook,linkedin,instagram
        ,country,pin,residence,city} = user;
    if(!email || !password)
{
    res.status(422).json({err:"incomplete fields"});
}
Country.findOne({email:email})
.then(getuser=>{
    if(getuser)
    {
        return res.status(422).json({err:"user already exist"});
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
            const Count=new Country({
                email,
                addedByOrg:userdets,
                password:hashed,
                name,
                dob,
                number,
                state,
                country,
                pin,
                residence,
                city,
                description,
                role,
                college,facebook,linkedin,instagram
            })
        Count.save()
        .then(response=>{
            res.json({success:"you are successfully registered"});
        })
        .catch(err=>{
            res.json({err:err})
        })
    })
    .catch(err=>{
        res.json({err:err})
    })
   
})
.catch(err=>{
    res.json({err:err})
})
}
//country adds campus, shit here we go again

const campusSignupByCountry=(user,role,userdets,res,addedby)=>{
    const {email,password,name,dob,number,state,description,
        college,facebook,linkedin,instagram,
        country,pin,residence,city} = user;
    if(!email || !password)
{
    res.status(422).json({err:"incomplete fields"});
}
User.findOne({email:email})
.then(getuser=>{
    if(getuser)
    {
        return res.status(422).json({err:"user already exist"});
    }
    bcrypt.hash(password,12)
    .then(hashed=>{
            const user=new User({
                email,
                addedByCountry:userdets,
                password:hashed,
                name,
                dob,
                number,
                state,
                country,
                pin,
                description,
                residence,
                city,
                role,
                college,facebook,linkedin,instagram
            })
        user.save()
        .then(response=>{
            res.json({success:"you are successfully registered"});
        })
        .catch(err=>{
            res.json({err:err})
        })
    })
    .catch(err=>{
        res.json({err:err})
    })
   
})
.catch(err=>{
    res.json({err:err})
})
}


module.exports={
    UserValidationByAdmin,
    UserValidationByOrg,
    UserValidationByCountry
};