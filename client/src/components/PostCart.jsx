import { Link } from 'react-router-dom';

const PostCart = ({ post }) => {
  return (
    <div className="group relative w-full border border-cyan-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[330px] transition-all duration-300 cursor-pointer">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="flex flex-col gap-4 p-3">
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm'>{post.category}</span>
        <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none'>Read article</Link>
      </div>
    </div>
  );
};
export default PostCart;
