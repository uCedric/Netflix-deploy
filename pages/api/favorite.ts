import { NextApiRequest,NextApiResponse } from "next";
import {without} from 'lodash';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { FcUpLeft } from "react-icons/fc";
import { isAwaitExpression } from "typescript";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try{
        if(req.method=='POST'){
            const {currentUser} = await serverAuth(req,res);
            const {movieId} =req.body;
            
            if(movieId == null) throw new Error('movieId undefined');

            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id:movieId,
                }
            });

            if(!existingMovie){
                throw new Error("invalid id");
            }

            const user = await prismadb.user.update({
                where:{
                    email:currentUser.email || '',
                },
                data:{
                    favoriteIds:{
                        push:movieId
                    }
                }
            });

            return res.status(200).json(user);
        }

        if(req.method=='DELETE'){
            const {currentUser} = await serverAuth(req,res);
            const {movieId} =req.body;
            console.log("this is movieId:"+movieId)
            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id:movieId,
                }
            });

            if(!existingMovie){
                throw new Error("invalid id");
            }

            const updatedFavoriteIds=without(currentUser.favoriteIds,movieId);
            const updatedUser = await prismadb.user.update({
                where:{
                    email : currentUser.email || '',
                },
                data : {
                    favoriteIds:updatedFavoriteIds
                }
            });

            return res.status(200).json(updatedUser);
        }
    }catch(error){
        console.log("nononononononononoooooooooooooooooooooooooooooooooo"+error);
        return res.status(400).end();
    }    
}