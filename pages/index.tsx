import {getSession,signOut} from'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from '@/component/Navbar';
import Billboard from '@/component/billboard';
import useMovieList from '@/hooks/useMovieList';
import MovieList from '@/component/movieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/component/infoModal';

export async function getServerSideProps(context:NextPageContext){
  const session = await getSession(context);
  
  if(!session){
    return{
      redirect:{
        destination:'/auth',
        permanent:false
      }
    }
  }
  return {
    props:{}
  }
}

export default function Home() {
  const {data:user} = useCurrentUser();
  const {data:movie=[]} =useMovieList();
  const {data:favorites=[]} = useFavorites();

  return (
    <>
      
      <Navbar/>
      <Billboard />
      <div className="pb-40">
        <MovieList title='Trending Now' data={movie}/>
        <MovieList title='My list' data={favorites}/>
      </div>
    </>  
  )
}//<InfoModal visible onClose={()=>{}}/>
