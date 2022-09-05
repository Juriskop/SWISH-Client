export const joinToUrl = (fragments: string[]): string => {
   let joinedUrl = fragments.shift();
   
   fragments.forEach((singleFragment) => {
       singleFragment = slashLeft(singleFragment);
       joinedUrl = slashRight(joinedUrl);
       joinedUrl += singleFragment;
   });
   return slashEnd(joinedUrl);
};

function slashLeft (fragment) {
   while(fragment.slice(0,1) == "/") fragment = fragment.slice(1);
   fragment = "/" + fragment;
   return fragment;
}

function slashRight (joinedUrl) {
   while(joinedUrl.slice(-1) == "/") joinedUrl = joinedUrl.slice(0, joinedUrl.length -1);
   return joinedUrl;
}

function slashEnd(joinedUrl) {
   while (joinedUrl.slice(-2) == "//")
      joinedUrl = joinedUrl.slice(0, joinedUrl.length - 1);
   return joinedUrl;
}