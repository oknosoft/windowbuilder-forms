export default {
  toggle: ({
    node: {
      toggled
    }
  }, duration = 300) => ({
    animation: {
      rotateZ: toggled ? 90 : 0,
      translateX: toggled ? 1 : 0,
      translateY: toggled ? -2 : 0
    },
    duration: duration
  }),
  drawer: () => ({
    enter: {
      animation: 'slideDown',
      duration: 300
    },
    leave: {
      animation: 'slideUp',
      duration: 300
    }
  })
};