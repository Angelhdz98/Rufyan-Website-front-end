import PaintingPreviewButtonPanel from './PaintingPreviewButtonPanel';
import { examplePaint } from './PaintingPreview';
import LoaderTag from './LoaderTag';


function PaintingLoader() {
 
  return (
    <div className='card w-64 h-64 border border-black flex  flex-col rounded-md overflow-hidden '>
      <div className='spinDiv  flex relative h-5/6 w-full  border border-blue-400 items-center justify-center bg-stone-800/30'>
      <div className="animate-spin  rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
      </div>
    <LoaderTag className=" w-16 h-4 absolute  bottom-3 left-3  "/>
    <LoaderTag className="w-20 h-8 absolute bottom-3 right-3 " /> 
      </div>
      <div className='h-1/6 bg-orange-600 place-content-center px-3'>
      <PaintingPreviewButtonPanel paint={examplePaint} isOriginalSelected={false} />
      </div>

      </div>
      
    
    );
};

export default PaintingLoader