import { Component, OnInit } from '@angular/core';
import { Link } from '../../model/link';
import { Node } from '../../model/node';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { EnterpriseIntegrationPatternsLoaderService } from '../../loader/enterprise-integration-patterns-loader.service';
import EnterpriseIntegrationPattern from '../../model/enterprise-integration-pattern';
import { EnterpriseIntegrationPatternsLinkLoaderService } from '../../loader/enterprise-integration-patterns-link-loader.service';

@Component({
  selector: 'pp-enterprise-integration-patterns',
  templateUrl: './enterprise-integration-patterns.component.html',
  styleUrls: ['./enterprise-integration-patterns.component.scss']
})
export class EnterpriseIntegrationPatternsComponent implements OnInit {

  data: {nodes: Node[], links: Link[]};

  patternMap: Map<string, EnterpriseIntegrationPattern>;
  nodes: Node[];

  linkMap: Map<string, Link>;
  links: Link[];

  constructor(private http: HttpClient,
    private loader: EnterpriseIntegrationPatternsLoaderService,
    private linkLoader: EnterpriseIntegrationPatternsLinkLoaderService) { }

  ngOnInit() {
    this.loader.loadContentFromStore().then(
      patternMap => {
        this.patternMap = patternMap;
        this.nodes = [];

        // convert given IRI -> EnterpriseIntegrationPattern Map to Node list for rendering
        patternMap.forEach((value, key) => {
          let n = new Node(value.name);
          n.description = value.description.value;

          this.nodes.push(n);
        });
      }
    );

    this.linkLoader.loadContentFromStore().then(
      linkMap => {
        this.linkMap = linkMap;
        this.links = Array.from(linkMap.values());
      }
    );

    

    this.http.get('http://localhost:4200/assets/enterpriseintegrationpatterns/EIP-combined-CLP.json')
      .subscribe((data) => {
        // collect all groups
        let groups = new Set();
        for(let node of data['nodes']) {
          if(node.group)
            groups.add(node.group)
        }
        let groupIds = Array.from(groups);
        let scale = d3.scaleOrdinal(d3.schemeCategory10);
        let color = function(d) {
          if(d)
            return scale('' + groupIds.indexOf(d));
          return scale('0');
        }

        // parse nodes
        let nodes: Node[] = [];
        for(let node of data['nodes']) {
          let curr: Node;
          curr = new Node(node.name);
          curr.group = node.group;
          curr.description = node.description;
          
          curr.color = color(curr.group);

          nodes.push(curr);
        }
        // parse links
        let links: Link[] = [];
        for(let link of data['links']) {
          let curr: Link;
          curr = new Link(
            link.source,
            link.target,
            link.type,
            link.description
          );

          // filter links depending on their type! Otherwise Nodes from other languages will be referenced leading to errors!
          if(link.type === 'default' || link.type === 'clp')
            links.push(curr);
        }

        // place data in field
        this.data = {
          'nodes': nodes,
          'links': links
        };
      });
  }
}
