import { Link } from "react-router-dom";

import editIcon from "../../assets/edit-icon.svg";
import eyeIcon from "../../assets/eye-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import useApi from "../../../utils/useApi";

const ListMovie = ({
  id,
  no,
  image,
  name,
  category,
  hours,
  minutes,
  release_date,
}) => {
  const api = useApi();

  // Handle Delete Movie
  const handleDelete = async (id) => {
    if (window.confirm(`Would you like to delete "${name}"?`)) {
      try {
        await api({ method: "DELETE", url: `/admin/movies/${id}` });
        location.reload();
      } catch ({ response }) {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center w-full text-sm text-[#1F4173] leading-[15px]">
        <div className="flex justify-center items-center w-[17px] h-[57px]">
          {no}
        </div>
        <div className="flex justify-center items-center w-[61px] h-[57px]">
          <div
            className="w-[46px] h-[38px] rounded-[10px] bg-cover bg-no-repeat bg-top"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
        <div className="flex justify-center items-center w-[130px] h-[57px] text-blue">
          {name}
        </div>
        <div className="flex justify-center items-center w-[220px] h-[57px]">
          {category.join(", ")}
        </div>
        <div className="flex justify-center items-center w-[117px] h-[57px]">
          {new Date(release_date).toLocaleDateString("id-ID")}
        </div>
        <div className="flex justify-center items-center w-[150px] h-[57px]">
          {hours} hours {minutes} minutes
        </div>
        <div className="flex justify-between items-center w-[119px] h-[57px]">
          {/* Edit */}
          <Link
            to={`/admin/movies/edit/${id}`}
            className="btn flex justify-center items-center size-[31px] rounded-md bg-blue transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300 cursor-pointer"
          >
            <img src={editIcon} alt="Edit icon" />
          </Link>

          {/* Read */}
          <Link
            to={`/admin/movies/read/${id}`}
            className="btn flex justify-center items-center size-[31px] rounded-md bg-[#5D5FEF] transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300 cursor-pointer"
          >
            <img src={eyeIcon} alt="Read icon" />
          </Link>

          {/* Delete */}
          <button
            onClick={() => handleDelete(id)}
            className="btn flex justify-center items-center size-[31px] rounded-md bg-[#E82C2C] transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300 cursor-pointer"
          >
            <img src={deleteIcon} alt="Delete icon" />
          </button>
        </div>
      </div>
      <div className="w-full border-t border-[#E6EAF0]"></div>
    </>
  );
};

export default ListMovie;
