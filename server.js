const express = require('express');
const { exec } = require('child_process');

const app = express();

const STACKS = {
  node: 'code-server-node',
  java: 'code-server-java',
  dotnet: 'code-server-dotnet'
};

app.use(express.static('public'));

app.get('/start/:stack', (req, res) => {
  const stack = req.params.stack;
  const image = STACKS[stack];

  if (!image) {
    return res.status(400).json({ error: 'Invalid stack' });
  }

  const port = Math.floor(10000 + Math.random() * 5000);
  const volumeName = `workspace-${stack}-${Date.now()}`;
  const containerName = `code-${stack}-${Date.now()}`;

  const cmd = `
    docker run -d \
      --name ${containerName} \
      -p ${port}:3002 \
      -e GITHUB_USERNAME=divakar3008200-cmyk \
      -e GITHUB_TOKEN=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 \
      -v ${volumeName}:/home/coder/project \
      ${image}
  `;

  exec(cmd, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Docker failed' });
    }

    res.json({
      url: `http://localhost:${port}`,
      container: containerName,
      volume: volumeName
    });
  });
});


app.listen(3001, () =>
  console.log('Stack selector running on http://localhost:3001')
);
