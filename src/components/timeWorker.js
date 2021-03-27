const start = performance.now();
setTimeout(() => {
  console.log(performance.now() - start);
}, 1000); // 10 minutes
