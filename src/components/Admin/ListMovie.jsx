import editIcon from "../../assets/edit-icon.svg";
import eyeIcon from "../../assets/eye-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import { Link } from "react-router-dom";
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

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete this movie?");
    if (confirm) {
      api({
        method: "DELETE",
        url: `/admin/movies/${id}`,
      })
        .then((_) => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="w-full text-sm text-[#1F4173] leading-[15px] flex justify-between items-center">
        <div className="w-[17px] h-[57px] flex justify-center items-center">
          {no}
        </div>
        <div className="w-[61px] h-[57px] flex justify-center items-center">
          <div
            className="w-[46px] h-[38px] rounded-[10px] bg-cover bg-no-repeat bg-top"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
        <div className="w-[130px] h-[57px] flex justify-center items-center text-blue">
          {name}
        </div>
        <div className="w-[220px] h-[57px] flex justify-center items-center">
          {category.join(", ")}
        </div>
        <div className="w-[117px] h-[57px] flex justify-center items-center">
          {new Date(release_date).toLocaleDateString()}
        </div>
        <div className="w-[150px] h-[57px] flex justify-center items-center">
          {hours} hours {minutes} minutes
        </div>
        <div className="w-[119px] h-[57px] flex justify-between items-center">
          {/* Edit Button */}
          <Link
            to={`/admin/movies/edit/${id}`}
            className="btn flex justify-center items-center size-[31px] rounded-md bg-blue transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300 cursor-pointer"
          >
            <img src={editIcon} alt={"edit icon"} />
          </Link>

          {/* Read Button */}
          <Link
            to={`/admin/movies/read/${id}`}
            className="btn flex justify-center items-center size-[31px] rounded-md bg-[#5D5FEF] transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300 cursor-pointer"
          >
            <img src={eyeIcon} alt={"read icon"} />
          </Link>

          {/* Delete Button */}
          <button
            to={`/admin/movies/read/${id}`}
            className="btn flex justify-center items-center size-[31px] rounded-md bg-[#E82C2C] transform active:scale-90 active:opacity-75 hover:bg-opacity-90 transition duration-300 cursor-pointer"
            onClick={() => handleDelete(id)}
          >
            <img src={deleteIcon} alt={"delete icon"} />
          </button>
        </div>
      </div>
      <div className="w-full border-t-1 border-[#E6EAF0]"></div>
    </>
  );
};

export default ListMovie;
