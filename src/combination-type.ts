function createPost(title: string, body: string) {
  return {
    type: 'post/create',
    payload: {
      title,
      body,
    },
  };
}

createPost.type = 'post/dsadsa';

type PostAction = ReturnType<typeof createPost>;

const newObj : PostAction;