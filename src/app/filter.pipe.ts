import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'filter'
})

export class  FilterPipe implements PipeTransform{

    transform(users: any, item: string): string{

        if (item === undefined) return users;

        return users.filter(function (user){
            return user.username.toLowerCase().includes(item.toLowerCase());

        })
    }
}