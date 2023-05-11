import { Post } from "@/helpers/types";
import NoDataComponent from "../NoDataComponent/NoDataComponent";
import PostComponent from "../PostComponent/PostComponent";

type Props = {
  data: Post[];
  deleteHandler: (payload: string) => void;
};

function AllPostDashboard({ data, deleteHandler }: Props) {
  return (
    <div className="flex flex-col gap-10 mt-10 ">
      {data?.length === 0 ? (
        <NoDataComponent type="post" />
      ) : (
        data?.map((item) => (
          <PostComponent
            key={item?.id}
            item={item}
            disabledLikeButton
            withDeleteButton
            deleteHandler={deleteHandler}
          />
        ))
      )}
    </div>
  );
}

export default AllPostDashboard;
