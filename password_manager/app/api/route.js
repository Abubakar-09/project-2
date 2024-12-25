import { dbConnect } from "@/lib/db/connection"
import Password_Manager from "@/lib/db/Password_Manager"


await dbConnect();
export async function GET() {
  let a = await Password_Manager.find();
  return Response.json(a)
}

export async function POST(req,res) {
  let a = await req.json();
  let b = {
    username: a.username[0],
    password: a.password[0],
    link: a.link[0]

  }
  await Password_Manager.create(b)
  return Response.json({message:true})
}

export async function DELETE(req,res) {
  let a = await req.json();
  await Password_Manager.findOneAndDelete(a)
  return Response.json({message:true})
}