import { faker } from "@faker-js/faker";
import { screen } from "@testing-library/react-native";
import ProjectDetails from "components/Projects/ProjectDetails";
import initI18next from "i18n/initI18next";
import React from "react";

import factory from "../../../factory";
import { renderComponent } from "../../../helpers/render";

const mockProject = factory( "RemoteProject", {
  title: faker.lorem.sentence( ),
  icon: faker.image.imageUrl( ),
  header_image_url: faker.image.imageUrl( ),
  description: faker.lorem.paragraph( )
} );

jest.mock( "sharedHooks/useAuthenticatedQuery", ( ) => ( {
  __esModule: true,
  default: ( ) => ( {
    data: mockProject
  } )
} ) );

jest.mock( "@react-navigation/native", ( ) => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useRoute: ( ) => ( {
      params: {
        id: mockProject.id
      }
    } )
  };
} );

describe( "ProjectDetails", ( ) => {
  beforeAll( async ( ) => {
    await initI18next( );
  } );
  test( "should not have accessibility errors", async ( ) => {
    renderComponent( <ProjectDetails /> );
    const projectDetails = await screen.findByTestId( "project-details" );
    expect( projectDetails ).toBeAccessible();
  } );

  test( "displays project details", ( ) => {
    renderComponent( <ProjectDetails /> );

    expect( screen.getByText( mockProject.title ) ).toBeTruthy( );
    expect( screen.getByText( mockProject.description ) ).toBeTruthy( );
    expect(
      screen.getByTestId( "ProjectDetails.headerImage" ).props.source
    ).toStrictEqual( { uri: mockProject.header_image_url } );
    expect(
      screen.getByTestId( "ProjectDetails.projectIcon" ).props.source
    ).toStrictEqual( { uri: mockProject.icon } );
  } );
} );
