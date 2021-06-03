import { AfterViewChecked ,Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[isAuthorized]'
})
export class IsAuthorizedDirective implements AfterViewChecked{

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  // Get cur token and authorized tokens
  @Input('isAuthorizedToken') token:string;
  @Input('isAuthorized') authorizedTokens:any;

  ngAfterViewChecked(){
    // Clear the container
    this.viewContainer.clear();

    // If token is included in the authorized token then display visible otherwise not
    if (this.authorizedTokens.includes(this.token)) {  
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else{
        this.viewContainer.clear();
      }
  }

}
