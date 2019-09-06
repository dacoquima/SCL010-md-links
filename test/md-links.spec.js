const mdLinks = require('./md-links');

describe('mdLinks', () => {

  it('debería retonar los links de un directorio con la opción por defecto', () => {
    expect.assertions(1);
    return mdLinks(userPath, options).then(res =>
      expect(res).toEqual(
        [{
            href: 'https://es.wikipedia.org/wiki/Niantic_Laxbs',
            text: 'Niantic, Inc.',
            file: '/Users/osx/Desktop/SCL010-md-links/markdowns/README.md'
          },
          {
            href: 'https://trello.com/b/dDEAROua/data-lovers',
            text: 'Trello',
            file: '/Users/osx/Desktop/SCL010-md-links/markdowns/README.md'
          }
        ]
      )
    )
});
});
