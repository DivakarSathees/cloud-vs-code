const express = require('express');
const { exec } = require('child_process');

const app = express();

const STACKS = {
  node: 'divakar77/code-server-aws-node:latest',
  java: 'code-server-java',
  dotnet: 'code-server-dotnet:latest'
};

app.use(express.static('public'));

app.get('/start/:stack', (req, res) => {
  const stack = req.params.stack;
  const image = STACKS[stack];

  if (!image) {
    return res.status(400).json({ error: 'Invalid stack' });
  }

  const port = Math.floor(10000 + Math.random() * 5000);
  // const volumeName = `workspace-${stack}-${Date.now()}`;
  // const containerName = `code-${stack}-${Date.now()}`;
  const ts = Date.now();

  const network = `net-${ts}`;
  const sqlContainer = `sql-${ts}`;
  const ideContainer = `code-${stack}-${ts}`;
  const volumeName = `workspace-${stack}-${ts}`;

  // const cmd = `
  //   docker run -d \
  //     --name ${containerName} \
  //     -p ${port}:3002 \
  //     -e GITHUB_USERNAME=divakar3008200-cmyk \
  //     -e GITHUB_TOKEN=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 \
  //     -v ${volumeName}:/home/coder/project \
  //     ${image}
  // `;
  console.log(network);
  
  const cmd = `
    docker network create ${network} &&

    docker run -d \
      --name ${sqlContainer} \
      --network ${network} \
      -e GITHUB_USERNAME=divakar3008200-cmyk \
      -e GITHUB_TOKEN=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 \
      -e ACCEPT_EULA=Y \
      -e SA_PASSWORD=examlyMssql@123 \
      mcr.microsoft.com/mssql/server:2022-latest &&

    docker run -d \
      --name ${ideContainer} \
      --network ${network} \
      -p ${port}:8443 \
      -e GITHUB_USERNAME=divakar3008200-cmyk \
      -e GITHUB_TOKEN=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 \
      -e DB_HOST=${sqlContainer} \
      -e DB_USER=sa \
      -e DB_PASSWORD=examlyMssql@123 \
      -v ${volumeName}:/home/coder/project \
      ${image}

  `;

  exec(cmd, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Docker failed' });
    }

    // res.json({
    //   url: `http://localhost:${port}`,
    //   container: containerName,
    //   volume: volumeName
    // });
    res.json({
      url: `http://localhost:${port}`,
      ide: ideContainer,
      sql: sqlContainer,
      network
    });
  });
});


app.listen(3001, () =>
  console.log('Stack selector running on http://localhost:3001')
);
