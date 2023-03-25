const newProjectButton = document.getElementById('new-project-button');
const projectNameInput = document.getElementById('project-name');

newProjectButton.addEventListener('click', function(event) {
  event.preventDefault();

  const projectName = projectNameInput.value;
  
  if (projectName) {
    const projectDir = '/Projects/' + projectName.toLowerCase().replace(/ /g, '-');
    
    // Request access to the file system
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function(fs) {
      
      // Create the new project directory
      fs.root.getDirectory(projectDir, {create: true}, function(dirEntry) {
        
        // Create the index.html file
        dirEntry.getFile('index.html', {create: true}, function(fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
            const html = '<!DOCTYPE html>\n<html>\n  <head>\n    <title>' + projectName + '</title>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n    <h1>' + projectName + '</h1>\n    <script src="app.js"></script>\n  </body>\n</html>';
            const blob = new Blob([html], {type: 'text/html'});
            fileWriter.write(blob);
          });
        });
        
        // Create the style.css file
        dirEntry.getFile('style.css', {create: true}, function(fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
            const css = '';
            const blob = new Blob([css], {type: 'text/css'});
            fileWriter.write(blob);
          });
        });
        
        // Create the app.js file
        dirEntry.getFile('app.js', {create: true}, function(fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
            const js = '';
            const blob = new Blob([js], {type: 'text/javascript'});
            fileWriter.write(blob);
          });
        });
        
        // Redirect to the new project page
        window.location.href = projectDir + '/index.html';
        
      }, function(error) {
        console.error('Failed to create project directory:', error);
      });
      
    }, function(error) {
      console.error('Failed to access file system:', error);
    });
  }
});
