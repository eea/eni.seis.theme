module.exports = {
 template: {
    dev: {
      engine: 'handlebars',
      cwd: 'mockup/',
      partials: ['mockup/partials/*.hbs'],
      // data: 'test/fixtures/data/data.json',
      options: {
      },
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'mockup/',      // Src matches are relative to this path.
          src: '*.hbs', // Actual pattern(s) to match.
          dest: './',   // Destination path prefix.
          ext: '.html'  // Dest filepaths will have this extension.
        }
      ]
    }
  },
}
