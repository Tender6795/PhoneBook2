import Contact from '../models/contact';
import *as UserService from '../services/UserService';

export const create=async (req,res,next)=>{
  const contactTmp=req.body;
  //console.dir(req.body);
  const {token} = req;
  let contact;
  try{
    const userTmp=await UserService.getUserByToken(token);
    contactTmp.userHash=userTmp.hash;
    contactTmp.pathToPicture=req.file.path;
    contact=await Contact.create(contactTmp);

  }catch ({message}) {
    console.log(message);
    next({
      status: 400,
      message
    });
  }
  res.json(contact);
};

export const searchByHash=async (req,res,next)=> {
  let contact;
  let {hash} = req.params;
  try {
    contact = await Contact.findOne({hash});
  } catch ({message}) {
    next({
      status: 400,
      message
    });

  }
  // console.dir(contact);
  res.json(contact);
};

export const all =async (req,res,next)=>{
  let contacts;
  let params = req.params;
  try{
    const {token} = req;
    const userTmp=await UserService.getUserByToken(token);
    const userHash=userTmp.hash;
    contacts=await Contact.find({userHash});

  }catch ({message}) {
    next({
      status: 400,
      message
    });
  }
  res.json(contacts);
};

export const update=async (req,res,next)=>{
  let contact;
  let {hash} = req.params;
//  console.dir(req.body);
try{
  const contactTmp=req.body;
  contactTmp.pathToPicture=req.file.path;
  contact=await Contact.findOneAndUpdate({hash: hash },contactTmp);
//console.dir(req.body);
} catch ({message}) {
  next({
    status: 400,
    message
  });
}
res.json(contact);
};

export const deleteContact=async (req,res,next)=>{
  let contact;
  try{
    const {token} = req;
    const userTmp=await UserService.getUserByToken(token);
    const userHash=userTmp.hash;
    contact=await Contact.find({userHash}).findOneAndRemove({hash: req.params.hash});
  } catch ({message}) {
    next({
      status: 400,
      message
    });
  }
  res.json(contact);
};

export const search=async (req,res,next)=>{
  let contacts;
  try{
    const {token} = req;
    const userTmp=await UserService.getUserByToken(token);
    const userHash=userTmp.hash;
    const searchParam=req.params;
    contacts=await Contact.find({userHash}).find(searchParam);

  } catch ({message}) {
    next({
      status: 400,
      message
    });
  }
  res.json(contacts);
};
