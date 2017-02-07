import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs';

@Injectable()
export class RacesService {
    private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
    private options = new RequestOptions({headers: this.headers});

    constructor(private http: Http, private authHttp: AuthHttp) {
    }

    getRaceSummary() {
        return this.http.get('/api/races').map(res => res.json());
    }

    addRaceFromRawData(race) : Observable<any> {
        let raceData = RacesService.getSplitsFromDataImport(race.rawRaceData, race.raceNumber);
        return this.authHttp.post('/api/races', JSON.stringify(raceData), this.options);
    }

    /**
     * This might look a little absurd, but this converts the tab-separated time time matrix to an array of objects.
     * It essentially splits on tabs, iterates through the names, and then places the times into the driver split obj.
     * Here's a good example of how it comes in (replace pipes with tabs)
     *    | Person A | Person B | Person C
     *  1 | 45.14    | 1:45.65  | 44.43
     *  2 | 44.43    | 55.24    | 1:00.43
     *  3 |          | 44.24    | 55.45
     */
    private static getSplitsFromDataImport(rawRaceData: string, raceNumber: number) {
        let splits = [];
        let lap = 0;
        let columnPosition = 0;
        let rawRaceDataSplit = RacesService.splitRawRaceData(rawRaceData);
        for (let rawDataSplit of rawRaceDataSplit) {
            if (rawDataSplit) {
                // First add all the drivers. These should be first, so the first 8 or so values should hit here.
                if (RacesService.isADriverName(rawDataSplit)) {
                    splits.push({
                        driverName: rawDataSplit,
                        raceNumber: raceNumber,
                        splits: []
                    });
                } else {
                    // After drivers are added, there should be one lap record, and then several time records.
                    if (columnPosition === 0) {
                        lap++; //should be an integer - so just increment the lap
                    } else if (rawDataSplit.trim()) { //there could be blank times
                        splits[columnPosition - 1].splits.push(RacesService.buildSplitObj(rawDataSplit, lap));
                    }
                    if (columnPosition === splits.length) {
                        // reset - next iteration starts with a lap
                        columnPosition = 0;
                    } else {
                        columnPosition++;
                    }
                }
            }
        }
        return splits;
    }

    private static splitRawRaceData(rawRaceData: string) {
        return rawRaceData.replace(/[\t\n]+/g, '	').trim().split('	');
    }

    private static buildSplitObj(rawDataSplit: string, lap: number) {
        let splitObj: any = {};
        splitObj.time = RacesService.getTotalSecondsFromRec(rawDataSplit);
        splitObj.lap = lap;
        return splitObj;
    }

    private static isADriverName(rec: string) {
        return isNaN(rec.trim() && parseFloat(rec)) && rec.indexOf(':') === -1 && rec.indexOf('.') === -1;
    }

    private static getTotalSecondsFromRec(rec: string) {
        if (rec.indexOf(':') !== -1) {
            let times = rec.split(":");
            let minutes = parseInt(times[0]);
            let seconds = parseFloat(times[1]);
            return seconds + (minutes * 60);
        } else {
            return parseFloat(rec);
        }
    }
}
