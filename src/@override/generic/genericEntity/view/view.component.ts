import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntitiesService } from '../../../utils/entities.service';
import { OverrideService } from '../../../utils/override.service';
import { EntityData } from '../../../utils/interfaces/entityData'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  entityData: EntityData;
  constructor(
    private router: Router,
    private entities: EntitiesService,
    public override: OverrideService) { }

  ngOnInit(): void {
    const url = this.router.url;
    let entity = this.entities.allEntities.find(entity => url.startsWith(entity.route))
    this.entityData = entity;
  }
}
