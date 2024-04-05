import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useStore } from '../../store';
import AnswerList from "./AnswerList";

const MainView: React.FC = () => {
  const { usersStore } = useStore();
  
  const handleSetPage = (page: number) => {
    usersStore.setPage(page);
    usersStore.loadUsers();
  };
  
  useEffect(() => {
    usersStore.loadUsers();
  }, [usersStore]);


  return <Observer>{() => {
    const {
      users,
      isLoading,
      page,
      totalPagesCount
    } = usersStore;

    return (
      <div className="col-md-12">
        <UserList
          users={users}
          loading={isLoading}
          totalPagesCount={totalPagesCount}
          currentPage={page}
          onSetPage={handleSetPage}
        />
      </div>
    );
  }}</Observer>
};

export default MainView;

// import React, { useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { Observer } from "mobx-react-lite";
// import { marked } from "marked";

// import { useStore } from '../../store';
// import RedError from "../RedError";
// import AnswerMeta from "./AnswerMeta";
// import commonStore from "@/stores/commonStore";
// import CommentContainer from "./CommentContainer";

// const Answer: React.FC = () => {
//   const history = useHistory();
//   const { answerStore } = useStore();
//   // useEffect(() => {
//   //   if (id) {
//   //     answerStore.loadAnswer(id, { acceptCached: true });
//   //     commentStore.setAnswerSlug(id);
//   //     commentStore.loadComments();
//   //   }
//   // }, [ answerStore, commentStore, id ]);

//   const handleDeleteAnswer = (id: string) => {
//     answerStore
//       .deleteAnswer(id)
//       .then(() => history.replace("/"));
//   };

//   return <Observer>{() => {
//     const { user } = commonStore;
//     const answers = answerStore.getAnswer(id || '');

//     if (!article) return <RedError message="Can't load article" />;

//     return (
//       <div className="article-page">
//         <div className="banner">
//           <div className="container">
//             <h1>{article.title}</h1>
//             <AnswerMeta
//               article={article}
//               canModify={canModify}
//               onDelete={handleDeleteAnswer}
//             />
//           </div>
//         </div>

//         <div className="container page">
//           <div className="row article-content">
//             <div className="col-xs-12">
//               <div dangerouslySetInnerHTML={markup} />

//               <ul className="tag-list">
//                 {article.tagList.map((tag: string) => {
//                   return (
//                     <li className="tag-default tag-pill tag-outline" key={tag}>
//                       {tag}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </div>

//           <hr />

//           <div className="article-actions" />

//           <div className="row">
//             {<CommentContainer
//               comments={comments}
//               errors={commentErrors}
//               id={id}
//               currentUser={currentUser}
//               onDelete={handleDeleteComment}
//             />}
//           </div>
//         </div>
//       </div>
//     );
//   }}</Observer>;
// };

// export default Answer;