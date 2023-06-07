# Grid system guide
A responsive grid system based on Flexbox Grid and the flex property, re-written in Sass, edited and expanded upon.
Visibility classes,Additional 'XL' breakpoint,Sass variables and mixins,Customizable grid
[Oficial guide](https://sassflexboxgrid.com/)

## Understanding
The grid system is used to create responsive layouts in HTML, allowing you to arrange elements in rows and columns. In this case, the grid system is based on different screen sizes, denoted by the classes col-{sreen-sizes}-{number}. Each class represents the number of columns the element should occupy on a particular screen size.

We have classes for row and columns to modified the aligment, column widths and visibility classes.
[See all classes](https://sassflexboxgrid.com/views/classes.html)

1. Enclose the entire grid structure within a `<div>` element with the class "row". This `<div>` represents a row in the grid system and will contain the columns.

        <div class="row"><!-- Columns go here --></div>

2. Add Columns inside the row `<div>`, you will have `<div>` elements representing the columns. Each column has its respective grid classes.

        <div class="row center">
            <div class="col-xs-12 col-sm-4 col-md-6 col-lg-4">
                <p>They never said winning was easy.</p>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-6 col-lg-4 ">
                <p>
                Another one. It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. They don’t want us to eat. The first of the month is coming, we have to get money, we have no choice. Some people can’t handle success, I can.
                </p>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-6 col-lg-4 first-xs">
                <p>
                The key to more success is to get a massage once a week, very important, major key, cloth talk.
                </p>
            </div>
        </div>

That's it! You have successfully set up a grid system using the provided HTML structure and classes. The columns will adjust their widths based on the screen size, allowing for a responsive layout. Feel free to modify the content and adjust the column classes as needed.

## Customize the grid
You can easily change the number of columns in your grid from the default 12. Update your breakpoint ranges by adjusting these variables and all of the media queries, classes and mixins will update accordingly'.

    $grid-columns: 12; // Set number of columns in the grid
    
    $xs-max: 40rem; // Set xs breakpoint's max width
    $sm-max: 64rem; // Set sm breakpoint's max width
    $md-max: 90rem; // Set md breakpoint's max width
    $lg-max: 120rem; // Set lg breakpoint's max width
    
    $gutter: 1rem; // Set gutter size
    
    $content-well-max-width: "none"; // Set the max-width of the content well
    
    $sm-start: ($xs-max + 1); // Generate sm breakpoint's min width
    $md-start: ($sm-max + 1); // Generate md breakpoint's min width
    $lg-start: ($md-max + 1); // Generate lg breakpoint's min width
    $xl-start: ($lg-max + 1); // Generate xl breakpoint's min width

## Utilities available
[See all classes](https://sassflexboxgrid.com/views/classes.html)

[See all variables](https://sassflexboxgrid.com/views/variables.html)

[See all mixins](https://sassflexboxgrid.com/views/mixins.html)