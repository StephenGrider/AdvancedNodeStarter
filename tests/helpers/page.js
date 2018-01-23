const Page = _page => {
  return new Proxy(_page, {
    get: function(target, propKey, receiver) {
      const prop = target[propKey];

      if (typeof prop === 'function') {
        return async function(...args) {
          const res = await prop.apply(target, args);
          console.log(res);
          return res;
        };
      } else {
        return prop;
      }
    }
  });
};

module.exports = Page;
