(function() {
    'use strict';

    angular.module('ng.bootstrap.year.calendar',['ui.bootstrap.datetimepicker'])
        .constant('uibYearCalendarConfig', {
            tplPopover: '<div class="event-tooltip-content">' +
                         '<div class="event-name" style="color: #000">{{day.event}}</div>' +
                        //+ '<div class="event-location">' + e.events[i].location + '</div>'
                         '</div>',

            tplAddEvent: '<div class="modal-content">' +
                         '<div class="modal-header">' +
                         '<button type="button" class="close" ng-click="cancel()">&times;</button>' +
                         '<h4 class="modal-title"><b>Evento</b></h4>' +
                         '</div>' +
                         '<div class="modal-body">' +
                            '<form name="formEvent" role="form" novalidate autocomplete="off">'+
                            
                                '<div class="form-group">' +
                                     
                                    '<div class="col-sm-12" ng-class="{ \'has-error\': formEvent.type.$invalid }">'+
                                    '<label for="type"><small>Tipo</small></label>' + 
                                    '<input type="text" name="type" class="form-control" ng-model="event.type" ng-required="true"></input>' +
                                    '<div class="help-block" ng-messages="formEvent.type.$error" ng-if="formEvent.type.$invalid">' +
                                        '<ui-erros></ui-erros>' +
                                    '</div>' +
                                    '</div>'+
                                    '<div class="col-xs-12 col-sm-6" ng-class="{ \'has-error\': formEvent.dt_ini.$invalid }">' +
                                        '<label for="dt_ini"><small>De:</small></label>' +
                                        '<p class="input-group">' +
                                            '<input type="text" class="form-control" name="dt_ini" ' +
                                                'ng-required="true"' +
                                                'close-text="Close"' +
                                                'placeholder="DD-MM-AAAA"' +
                                                'uib-datepicker-popup="dd-MM-yyyy"' +
                                                'ng-model="event.dt_ini"' +
                                                'is-open="datepickers.dt_ini"' +
                                                'datepicker-options="dateOptions1"' +
                                                'close-text="Close" />' +
                                            '<span class="input-group-btn">' +
                                            '<button type="button" class="btn btn-default" ng-click="open($event, \'dt_ini\')"><i class="glyphicon glyphicon-calendar"></i></button>' +
                                            '</span>' +
                                        '</p>'+ 
                                        '<div class="help-block" ng-messages="formEvent.dt_ini.$error" ng-if="formEvent.dt_ini.$invalid">' +
                                            '<ui-erros></ui-erros>' +
                                        '</div>' +
                                    '</div>'+
                                    '<div class="col-xs-12 col-sm-6" ng-class="{ \'has-error\': formEvent.dt_fim.$invalid }">' +
                                        '<label for="dt_ini"><small>a:</small></label>' +
                                        '<p class="input-group">' +
                                            '<input type="text" class="form-control" name="dt_fim" ' +
                                                'ng-required="true"' +
                                                'close-text="Close"' +
                                                'placeholder="DD-MM-AAAA"' +
                                                'uib-datepicker-popup="dd-MM-yyyy"' +
                                                'ng-model="event.dt_fim"' +
                                                'is-open="datepickers.dt_fim"' +
                                                'datepicker-options="dateOptions1"' +
                                                'close-text="Close" />' +
                                            '<span class="input-group-btn">' +
                                            '<button type="button" class="btn btn-default" ng-click="open($event, \'dt_fim\')"><i class="glyphicon glyphicon-calendar"></i></button>' +
                                            '</span>' +
                                        '</p>'+ 
                                        '<div class="help-block" ng-messages="formEvent.dt_fim.$error" ng-if="formEvent.dt_fim.$invalid">' +
                                            '<ui-erros></ui-erros>' +
                                        '</div>' +
                                    '</div>'+
                            
                                '</div>'+
                            '</form>' +
                            '<div class="clearfix"></div>' +
                         '</div>' +
                         '<div class="modal-footer">' +
                         '<button type="button" class="btn btn-primary" ng-click="ok()" ng-disabled="okDisabled || formEvent.$invalid"> ' +
                            '<i class="fa fa-check"></i> Confirmar' +
                         '</button>' +
                         '<button type="button" class="btn btn-default" ng-click="cancel()"> &laquo; Voltar</button>' +
                        '</div>' +
                        '</div>',
          
                         
            dates: {days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
                    daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                    daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
                    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    weekShort: 'S',
                    weekStart:0}
        })
        .directive('uibContextMenu', [

            function() {
              return {
                restrict: 'A',
                scope: '@&',
                compile: function compile(tElement, tAttrs, transclude) {
                  return {
                    post: function postLink(scope, iElement, iAttrs, controller) {
                      var ul = $('#' + iAttrs.uibContextMenu),
                        last = null;
        
                      ul.css({
                        'display': 'none'
                      });
                      $(iElement).bind('contextmenu', function(event) {
                        event.preventDefault();
                         ul.css({
                          position: "fixed",
                          display: "block",
                          left: event.clientX + 'px',
                          top: event.clientY + 'px'
                        });
                        last = event.timeStamp;
                      });
        
                      $(document).click(function(event) {
                        var target = $(event.target);
                        if (!target.is(".popover") && !target.parents().is(".popover")) {
                          if (last === event.timeStamp)
                            return;
                          ul.css({
                            'display': 'none'
                          });
                        }
                      });
                    }
                  };
                }
              };
            }
          ])
        .directive("uibYearCalendar", [ '$window', '$templateCache', '$uibModal',  function($window, $templateCache, $uibModal) {
            return {
		replace: true,
		restrict: "AE",
                 template: '<div class="calendar" id="persCal" ng-mouseup="endSelect($event)">\n' +
                            '<div class="calendar-header panel">\n'+
                            '<table>\n'+
                                '<th class="prev" ng-click="setYear(thisyear-1)"><span class="glyphicon glyphicon-chevron-left"></span></th>\n'+
                                '<th class="year-title year-neighbor2 hidden-sm hidden-xs" ng-click="setYear(thisyear-2)">{{thisyear-2}}</th>\n'+
                                '<th class="year-title year-neighbor hidden-xs" ng-click="setYear(thisyear-1)">{{thisyear-1}}</th>\n'+
                                '<th class="year-title" >{{thisyear}}</th>\n'+
                                '<th class="year-title year-neighbor hidden-xs" ng-click="setYear(thisyear+1)">{{thisyear+1}}</th>\n'+
                                '<th class="year-title year-neighbor2 hidden-sm hidden-xs" ng-click="setYear(thisyear+2)">{{thisyear+2}}</th>\n'+
                                '<th class="next" ng-click="setYear(thisyear+1)"><span class="glyphicon glyphicon-chevron-right"></span></th>\n'+
                            '</table>\n'+
                            '</div>\n' +
                            '<div class="months-container" style="display: block;">\n' +
                                '<div class="month-container repeated-item" ng-class="monthContainerClass" ng-repeat="month in calendar">\n' +
                                    '<table class="month" uib-year-cal-context-menu="context1" >\n' +
                                        '<thead><tr><th class="month-title bg-skin" colspan="7">{{dates.months[month.m]}}</th></tr>\n' +
                                                '<tr><th class="day-header text-muted" ng-repeat="days in dates.daysShort track by $index">{{days}}</th></tr>\n' +
                                        '</thead>\n' +
                                        '<tbody><tr ng-repeat="week in month.w">\n' +
                                                    '<td ng-repeat="day in week track by $index" class="{{day.class}}" ng-class="day.oeclass"\n' +
                                                        'ng-style="styleFn(mouseHoverList, thisyear, month.m, day.dd)"\n' +
                                                        'ng-mousedown="initSelect($event, thisyear, month.m, day.dd)"\n' +
                                                        'ng-mousemove="moveSelect($event, thisyear, month.m, day.dd)"\n' + 
                                                        'ng-mouseup="endSelect($event)"\n' +
                                                        'uib-context-menu="context1">\n' +
                                                        '<div popover-enable="{{day.showevent}}"\n'+ 
                                                             'uib-popover-template="\'tplCalPopover.html\'"\n'+
                                                             'popover-trigger="mouseenter"\n' +
                                                             'class="day-content" ng-class="day.oclass" ng-show="day.dd">{{day.dd}}</div>\n' +
                                                    '</td></tr>\n' +
                                        '</tbody>\n' +
                                    '</table>\n' +
                                '</div>\n'+
                            '</div>\n'+
                            '<ul id="context1" class="dropdown-menu">\n' +
                            '<li><a ng-click="myclick2()"><i class="fa fa-fw fa-edit"></i><small> Editar</small></a></li>\n'+
                            '<li><a ng-click="delete()"><i class="fa fa-fw fa-times"></i><small> Cancelar</small></a></li>\n'+
                            '<li class="divider"></li>\n'+
                            '<li><a ng-click="properties()"><i class="fa fa-fw fa-cog"></i><small> Propriedades</small></a></li>\n'+
                            '</ul>\n' +
                            '</div>\n',
                controller: ['$scope', '$filter', 'uibYearCalendarConfig', function($scope, $filter, uibYearCalendarConfig){
                    
                    $templateCache.put('tplCalPopover.html', uibYearCalendarConfig.tplPopover);
                    $templateCache.put('tplCalEvent.html', uibYearCalendarConfig.tplAddEvent);
                    
                    $scope.dates = uibYearCalendarConfig.dates;

                    $scope.rangeDates = [];
                    var mouseIsDown   = false;
                    $scope.mouseHoverList= [];                

                    $scope.myclick2 = function(){
                        console.log('MENU DE CONTEXTO!');
                    };
                    
                    function renderEvents(src){
                       //acumular eventos 
                       //incluir feriados
                    }
                    
                    function generateCal(year){
                        
                        var firstDate;
                        var currentDate; 
                        var lastDate;
                        var calendar = [];
                        var monthDays;
                        var oclass;
                        var oeclass;
                        var evento;
                        var showevento;
                        var today = new Date();
                        
                        
                        for(var month = 0; month < 12; month++) {
                            
                            monthDays   = {y: year, m: month, w: []};
                            firstDate   = new Date(year, month, 1);
                            currentDate = new Date(firstDate.getTime());
                            lastDate    = new Date(year, month + 1, 0);

                            while(currentDate.getDay() !== $scope.dates.weekStart){
                                currentDate.setDate(currentDate.getDate() - 1);
                            }

                            while(currentDate <= lastDate){
                                var weekDays = [];
                                do
                                {
                                        if(currentDate < firstDate) {
                                                weekDays.push({class : 'day old'});
                                        }
                                        else if(currentDate > lastDate) {
                                                weekDays.push({class : 'day new'});
                                        }
                                        else {
                                            oclass = '';
                                            evento = '';
                                            showevento = false;
                                            oeclass = '';
                                            if(currentDate.getFullYear() === today.getFullYear() && 
                                                currentDate.getMonth() === today.getMonth() && 
                                                currentDate.getDate() === today.getDate()) {
                                                oclass = 'cal-unico-today';
                                                evento = 'Hoje';
                                                showevento = true;
                                            }/*
                                            else if(currentDate.getFullYear() === today.getFullYear() && 
                                                    currentDate.getMonth() === 0) {
                                                oeclass = 'bg-danger';
                                                evento = 'Faltas';
                                                showevento = true;
                                            }
                                            else if(currentDate.getFullYear() === today.getFullYear() && 
                                                    currentDate.getMonth() === 8) {
                                                oeclass = 'bg-primary';
                                                evento = 'Férias';
                                                showevento = true;
                                            }*/
                                            weekDays.push({dd: currentDate.getDate(), class : 'day', oclass: oclass, oeclass: oeclass, event: evento, showevent: showevento} );
                                        }

                                        currentDate.setDate(currentDate.getDate() + 1);
                                }
                                while(currentDate.getDay() !== $scope.dates.weekStart);
                                monthDays.w.push(weekDays);
                            }

                            calendar.push(monthDays);                            
                        }
                        return calendar;
                    }
                    
                    $scope.thisyear = new Date().getFullYear();                    
                    $scope.calendar = generateCal($scope.thisyear);
                    
                    $scope.setYear = function(year){
                        $scope.calendar = [];
                        $scope.thisyear = year;
                        $scope.calendar = generateCal($scope.thisyear);
                    };
                    

                    $scope.styleFn = function(range, y, m , d){
                        if (range.length > 1){
                            var rangeIni = new Date(range[0].year, range[0].month, range[0].day);
                            var rangeEnd = new Date(range[1].year, range[1].month, range[1].day);
                            var dt       = new Date(y, m, d);
                            if (dt >= rangeIni && dt <= rangeEnd){
                                return  { "background-color" : "rgba(0,0,0,.2)"};
                            }
                        }
                        return;
                        
                    };

                    $scope.initSelect = function(evt, y, m , d){
                    
                        if (evt.which === 1){
                            $scope.rangeDates = [];
                            $scope.mouseHoverList    = [];
                            if(d){
                                var dt = new Date (y, m, d);
                                $scope.rangeDates.push(dt);
                                $scope.mouseHoverList[0] = {year : y, month: m, day: d};
                                $scope.mouseHoverList[1] = {year : y, month: m, day: d};
                            }
                            mouseIsDown = true;
                        }
                    };

                    $scope.moveSelect = function(evt, y, m , d){
                        if (mouseIsDown && d ) {

                            var dt = new Date (y, m, d);
                            if($scope.rangeDates[0] == null){
                                $scope.rangeDates[0] = dt;
                                $scope.mouseHoverList[0] = {year : y, month: m, day: d};
                                $scope.mouseHoverList[1] = {year : y, month: m, day: d};
                            }
                            if (dt < $scope.rangeDates[0]){
                                $scope.mouseHoverList[0] =  {year : y, month: m, day: d};
                                $scope.mouseHoverList[1] =  {year : $scope.rangeDates[0].getFullYear(), month: $scope.rangeDates[0].getMonth(), day: $scope.rangeDates[0].getDate()};
                            }
                            else{
                                if (dt > $scope.rangeDates[0]){
                                    $scope.mouseHoverList[1] =  {year : y, month: m, day: d};
                                    $scope.mouseHoverList[0] =  {year : $scope.rangeDates[0].getFullYear(), month: $scope.rangeDates[0].getMonth(), day: $scope.rangeDates[0].getDate()};
                                }
                                else{

                                    if (dt > new Date($scope.mouseHoverList[0].year, $scope.mouseHoverList[0].month, $scope.mouseHoverList[0].day)){
                                        $scope.mouseHoverList[1] = {year : y, month: m, day: d};
                                    }
                                    else{
                                        $scope.mouseHoverList[0] = {year : y, month: m, day: d};
                                    }
                                }
                            }
                           
                        }                      
                    };

                    $scope.endSelect = function(evt){
                        if (evt.which === 1){

                            if ($scope.mouseHoverList[0] && $scope.mouseHoverList[1]){
                                $scope.rangeDates[0]    = new Date($scope.mouseHoverList[0].year, $scope.mouseHoverList[0].month, $scope.mouseHoverList[0].day);
                                $scope.rangeDates[1]    = new Date($scope.mouseHoverList[1].year, $scope.mouseHoverList[1].month, $scope.mouseHoverList[1].day);
                                $scope.mouseHoverList   = [];
                                addEvent($scope.rangeDates, $scope.calendar);
                            }
                            
                            mouseIsDown = false;
                           
                        }
                    };

                    function addEvent(dates, cal){
                        $uibModal.open({
                            templateUrl: 'tplCalEvent.html',
                            size: 'md',
                            controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                                
                                $scope.event = {};
                                $scope.event.dt_ini = dates[0];
                                $scope.event.dt_fim = dates[1];

                                $scope.datepickers = {
                                    dt_ini: false,
                                    dt_fim: false
                                };                            
                                
                                $scope.open = function($event, which) {
                                    $scope.datepickers[which]= true;
                                };
            
                                $scope.dateOptions = { formatYear: 'yyyy', startingDay: 1 };
                                $scope.format      = 'dd-MM-yyyy';

                                $scope.ok = function () {
                                    var currentDate = $scope.event.dt_ini;
                                    var lastDate    = $scope.event.dt_fim;
                                    while(currentDate <= lastDate){
                                        for(var month = 0; month < 12; month++) {
                                           if (cal[month].y === currentDate.getFullYear() && cal[month].m === currentDate.getMonth()){
                                                for(var week = 0; week < cal[month].w.length; week++) {
                                                    for (var day = 0; day < cal[month].w[week].length; day++){
                                                       if( cal[month].w[week][day].dd === currentDate.getDate() ){
                                                           cal[month].w[week][day].oeclass    = 'bg-light-blue-active';
                                                           cal[month].w[week][day].event      = $scope.event.type;
                                                           cal[month].w[week][day].showevent  = true;
                                                       }
                                                       
                                                    }
                                                }
                                           }
                                        }
                                        currentDate.setDate(currentDate.getDate() + 1);
                                    }
                                    $uibModalInstance.dismiss('ok');
                                };

                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                               
                                                                        
                            }]    
                        });
                    }
                    
                    function setGrid(mw){
                        
                        var calWidth = angular.element(document.getElementById('persCal')).context.clientWidth;
                        var monthWidth; 
                        
                        if (mw) {
                            monthWidth = 188;
                        }
                        else{
                            monthWidth =  document.querySelectorAll(".month")[0].clientWidth;
                        }
                        
                        if(monthWidth * 6 < calWidth) {
                                $scope.monthContainerClass = ' col-xs-2';
                        }
                        else if(monthWidth * 4 < calWidth) {
                                $scope.monthContainerClass = ' col-xs-3';
                        }
                        else if(monthWidth * 3 < calWidth) {
                                $scope.monthContainerClass = ' col-xs-4';
                        }
                        else if(monthWidth * 2 < calWidth) {
                                $scope.monthContainerClass = ' col-xs-6';
                        }
                        else {
                                $scope.monthContainerClass = ' col-xs-12';
                        }
                        // manuall $digest required as resize event
                        // is outside of angular
                        if(!mw){
                            $scope.$digest();
                        };
                    }
                    
                    setGrid(188);
                    
                    angular.element($window).bind('resize', function(){
                        setGrid();
                    });

                    
                }]
            };
        }]);
})();
