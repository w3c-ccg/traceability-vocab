const renderNetwork = () => {
  const yaml = window.jsyaml;
  const getSchemas = async () => {
    const oas = 'https://w3id.org/traceability/openapi/openapi.yml';
    const res = await fetch(oas);
    const specYaml = await res.text();
    const openapi = yaml.load(specYaml);
    const options = Object.keys(openapi.paths).map((p) => p);
    return options;
  };
  const getSchema = async (path) => {
    const oas = `https://w3id.org/traceability/openapi/components/${path}`;
    const res = await fetch(oas);
    const schemaYaml = await res.text();
    return yaml.load(schemaYaml);
  };

  const schemasToGraph = (schemas) => {
    const links = [];
    const nodes = schemas.map((s) => {
      const name = s.path.split('/').pop().split('.')[0];
      const category = name.includes('Certificate') ? 1 : 0;
      return {
 id: name, path: s.path, category, name
};
    });
    schemas.forEach((s) => {
      const schemaString = JSON.stringify(s.schema);
      nodes.forEach((n) => {
        if (schemaString.includes(`${n.id}.yml`)) {
          const parent = nodes.find((np) => np.path === s.path);
          const child = nodes.find((nc) => nc.path === n.path);
          links.push({
 source: parent.id, target: child.id, value: 1,
});
        }
      });
    });
    return { nodes, links };
  };
  (async () => {
    const paths = await getSchemas();
    const schemas = await Promise.all(
      paths.map(async (p) => {
        const s = await getSchema(p);
        return { schema: s, path: p };
      })
    );
    const data = schemasToGraph(schemas);

    data.nodes.forEach((n, i) => {
      const edgeCount = data.links.filter((link) => link.source === n.id || link.target === n.id).length;
      n.symbolSize = edgeCount;
      n.value = edgeCount;
    });

data.categories = [
  {
    name: 'Types'
  },
  {
    name: 'Certificates'
  }
];

    const dom = document.getElementById('network-container');
  const myNetworkChart = window.echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  const option = {
    tooltip: {},
    legend: [
      {
        data: data.categories.map((a) => a.name)
      }
    ],
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Traceability',
        type: 'graph',
        layout: 'circular',
        circular: {
          rotateLabel: true
        },
        data: data.nodes,
        links: data.links,
        categories: data.categories,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  };
  myNetworkChart.setOption(option);
  })();
};

(async () => {
  setTimeout(async () => {
    const dom = document.getElementById('chart-container');
    const myChart = window.echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    const res = await fetch('./credentials-with-issuer-dependent-terms.json');
    const undefinedTermsByCredentialType = await res.json();
    const source = undefinedTermsByCredentialType.map((ct) => [ct.type, ct.count]);
    const option = {
      dataset: [
        {
          dimensions: ['name', 'score'],
          source,
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'score', order: 'desc' },
          },
        },
      ],
      xAxis: {
        type: 'category',
        triggerEvent: true,
        axisLabel: {
          interval: 0,
          rotate: 30,
          formatter(value) {
            const short = `${value.substring(0, 8)}...`;
            return short;
          },
        },
      },
      yAxis: {},
      series: {
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        itemStyle: { color: '#ff9800' },
        datasetIndex: 1,
      },
    };
    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }
    myChart.on('click', (params) => {
      // Make sure event from target axis
      if (params.componentType === 'xAxis' && params.xAxisIndex === 0) {
        // params.value is the axis label before formatted
        const endpoint = `https://w3id.org/traceability/openapi/components/schemas/credentials/${params.value}.yml`;
        window.open(endpoint, '_blank');
      }
    });
    window.addEventListener('resize', myChart.resize);
    renderNetwork();
  }, 2 * 1000);
})();
