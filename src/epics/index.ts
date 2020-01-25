import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { ajax } from 'rxjs/observable/dom/ajax';

import {
  FETCH_WHISKIES,
  fetchWhiskiesSuccess,
  fetchWhiskiesFailure
} from '../actions/index';

const fetchURL = 'https://picsum.photos/v2/list?limit=10'; // The API for the whiskies
/*
    The API returns the data in the following format:
  [
    {
        "id": "0",
        "author": "Alejandro Escamilla",
        "width": 5616,
        "height": 3744,
        "url": "https://unsplash.com/...",
        "download_url": "https://picsum.photos/..."
    }
  ]
    since we are only interested in the results array we will have to use map on our observable
 */

function fetchWhiskiesEpic(action$: any) {
  //action$ is a stream of actions
  // actions$.ofType is the outer Observable
  console.log('fired');
  return (
    action$
      .ofType(FETCH_WHISKIES) // ofType(FETCH_WHISKIES) is just a simpler version of .filter(x => x.type === FETCH_WHISKIES)
      .switchMap(() => {
        console.log('action fired');
        // ajax calls from Observable return observables. This is how we generate the inner Observable
        return ajax
          .getJSON(fetchURL) //getJSON simply sends a GET request with Content-Type application/json
          .map((data: any) => {
            console.log('data', data);
            return data;
          }) //get the data and extract only the results
          .map((whiskies: any) =>
            whiskies.map((whisky: any) => ({
              id: whisky.id,
              title: whisky.author,
              imageURL: whisky.download_url
            }))
          )
          .map((whiskies: any) =>
            whiskies.filter((whisky: any) => !!whisky.imageURL)
          );
        //at the end our inner Observable has a stream of an array of whisky objects which will be merge into the outer Observable
      })
      .map((whiskies: any) => fetchWhiskiesSuccess(whiskies)) // map the resulting array to an action of type FETCH_WHISKIES_SUCCESS
      // every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
      //if an erro occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
      .catch((error: any) => Observable.of(fetchWhiskiesFailure(error)))
  );
}

export const rootEpic = fetchWhiskiesEpic;
