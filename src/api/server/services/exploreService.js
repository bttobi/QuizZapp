const getExplorePage = (req, res, next) => {
  console.log(
    'Page:' +
      req.params.page +
      ' ' +
      req.headers.namefilter +
      req.headers.categoryfilter
  );
  res.status(200).json([
    {
      quizID: 1,
      name: 'Fire in the hole',
      author: 'Lobotomy God',
      category: 'ANIME',
      thumbnailSrc:
        'https://cdn.pixabay.com/photo/2020/11/08/11/22/man-5723449_640.jpg',
    },
    {
      quizID: 2,
      name: 'Fire in the hole',
      author: 'Lobotomy God',
      category: 'HISTORY',
      thumbnailSrc:
        'https://cdn.pixabay.com/photo/2020/11/08/11/22/man-5723449_640.jpg',
    },
    {
      quizID: 3,
      name: 'Fire in the hole',
      author: 'Lobotomy God',
      category: 'GAMING',
    },
  ]);
};

const exploreService = { getExplorePage };
export default exploreService;
