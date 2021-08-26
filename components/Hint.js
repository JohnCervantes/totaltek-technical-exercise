import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Hint() {
  return (
    <div className="text-green-400 w-[30px] h-[30px] hover-trigger mr-[270px] mb-1">
      <FontAwesomeIcon icon={faInfoCircle} />
      <div className="absolute rounded bg-green-50 border border-black w-[300px] hover-target p-3 pl-10 z-50">
        Valid Zipcode formats: <br /> 
        USA: <br />
        • 00000 <br />
        • 00000-0000 <br />
        Mexico: <br />
        • 00000 <br />
      </div>
    </div>
  );
}
