const request = require('./request');

// function postActor(actor) {
//   return request
//     .post('/api/actors')
//     .send(actor)
//     .expect(200)
//     .then(({ body }) => body);
// }

// function postStudio(house) {
//   return request
//     .post('/api/studios')
//     .send(house)
//     .expect(200)
//     .then(({ body }) => body);
// }

// // function postReviewer(dude) {
// //   return request
// //     .post('/api/reviewers')
// //     .send(dude)
// //     .expect(200)
// //     .then(({ body }) => body);
// // }

// // function postReview(actor, house, reviewer, film, review) {
// //   return Promise.all([
// //     postActor(actor),
// //     postStudio(house),
// //     postReviewer(reviewer)
// //   ])
// //     .then(([actorBody, studioBody, reviewerBody])=> {
// //       film.cast[0].actor = actorBody._id;
// //       film.studio = studioBody._id;
// //       review.reviewer = reviewerBody._id;
// //       return request
// //         .post('/api/films')
// //         .send(film)
// //         .expect(200)
// //         .then(({ body }) => {
// //           review.film = body._id;
// //           return request
// //             .post('/api/reviews')
// //             .send(review)
// //             .expect(200);
// //         });
// //     })
// //     .then(({ body }) => {
// //       return body;
// //     });
// // }

// // function postFilm(actor, house, film) {
// //   return Promise.all([
// //     postActor(actor),
// //     postStudio(house)
// //   ])
// //     .then(([actorBody, studioBody])=> {
// //       film.cast[0].actor = actorBody._id;
// //       film.studio = studioBody._id;
// //       return request
// //         .post('/api/films')
// //         .send(film)
// //         .expect(200);
// //     })
// //     .then(({ body }) => {
// //       return body;
// //     });
// // }
    
// module.exports = { postActor, postReview, postReviewer, postStudio, postFilm };