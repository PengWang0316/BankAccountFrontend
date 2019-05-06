const React = require('react');
// For mock useEffect
module.exports = { ...React, useEffect: React.useLayoutEffect };
